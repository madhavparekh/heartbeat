require('dotenv').config();
var axios = require('axios');
var request = require('request');
var fs = require('fs');
var db = require('../models');
var csv = require('csvtojson');

const usgsDataURL = `https://waterdata.usgs.gov/nwis/dv?cb_00060=on&format=rdb&site_no=00000000&referred_module=sw&period=&begin_date=1899-07-01&end_date=`;

var { rioGrandGauges } = require('../static/rioGrandGauges');

const params4USGS = {
	noheader: true,
	headers: ['agency', 'gauge_id', 'date', 'discharge', 'discharge_data_type'],
	delimiter: 'auto',
	colParser: {
		date: (date) => new Date(date),
		discharge: (discharge) => parseFloat(discharge).toFixed(2),
		gauge_id: (gauge) => gauge.toString().padStart(8, 0),
		column1: 'omit',
		column5: 'omit',
	},
	ignoreEmpty: true,
};

const params4UNIMPAIRED = {
	noheader: false,
	delimiter: 'auto',
	colParser: {
		date: (date) => new Date(date),
		column2: 'omit',
		column3: 'omit',
		column4: 'omit',
	},
	ignoreEmpty: true,
};

const params4IBWC = {
	noheader: true,
	delimiter: [' '],
	ignoreEmpty: true,
};

exports.uploadUnimpairedDatabase = async () => {
	var headers = ['date', 'year', 'month', 'day'];
	rioGrandGauges.forEach((gauge) => headers.push(gauge.id));

	params4UNIMPAIRED.headers = headers;

	try {
		await db.UnImpairedData.deleteMany();
		var count = 0;
		csv(params4UNIMPAIRED)
			.fromStream(request.get(process.env.UNIMPAIRED_FILE_URL))
			.on('data', (data) => {
				data = JSON.parse(data);
				let objArr = [];

				rioGrandGauges.forEach((gauge, indx) => {
					let obj = {
						gauge_id: gauge.id,
						discharge: data[gauge.id]
							? parseFloat(data[gauge.id]).toFixed(2)
							: null,
						date: data['date'],
					};
					objArr.push(obj);
				});
				db.UnImpairedData.insertMany(objArr)
					.then(() => {})
					.catch((err) => {
						if (err) throw err;
					});
			})
			.on('done', (err) => {
				if (err) throw err;
			});
	} catch (err) {
		throw err;
	}
};

exports.uploadImpairedDatabase = async () => {
	var today = new Date(Date.now());
	today = today.toISOString().split('T')[0];

	try {
		await db.ImpairedData.deleteMany();

		await rioGrandGauges.forEach((gauge) => {
			var url = usgsDataURL.replace('00000000', gauge.id) + today;
			if (gauge.agency === 'USGS') {
				axios.get(url).then((response) => {
					var data = response.data
						.slice(response.data.lastIndexOf('10s') + '10s'.length + 1)
						.trim();

					csv(params4USGS)
						.fromString(data)
						.then((jsonArr) => {
							db.ImpairedData.insertMany(jsonArr).catch((err) => {
								if (err) {
									console.log(err);
									return err;
								}
							});
						});
				});
			} else if (gauge.agency === 'IBWC') {
				params4IBWC.output = 'json';
				axios.get(gauge.data_url).then((response) => {
					var data = response.data
						.slice(
							response.data.lastIndexOf('REVISION') + 'REVISION'.length + 1
						)
						.trim();
					data = data.replace('</PRE>', '').trim();
					data = data.replace('</BODY>', '').trim();
					data = data.replace('</HTML>', '').trim();

					csv(params4IBWC)
						.fromString(data)
						.then((jsonArr) => {
							var objArr = [];
							jsonArr.forEach((json, indx) => {
								var obj = {
									gauge_id: gauge.id,
								};

								Object.keys(json).map((key, indx) => {
									if (indx === 0) obj.date = new Date(json[key]);
									if (indx === 1)
										obj.discharge =
											json[key] === 'NR'
												? null
												: (json[key] * 35.3147).toFixed(2); //cms to cfs
								});
								objArr.push(obj);
							});
							db.ImpairedData.insertMany(objArr).catch((err) => {
								if (err) {
									console.log(err);
									return err;
								}
							});
						});
				});
			}
		});
	} catch (err) {
		throw err;
	}
};

exports.uploadAggregateData = async () => {
	var impairedAggrDB = db.ImpairedAggregateData;
	var unImpairedAggrDB = db.UnImpairedAggregateData;

	await impairedAggrDB.deleteMany({});
	await unImpairedAggrDB.deleteMany({});

	pullDailyData(impairedAggrDB, db.ImpairedData);
	pullDailyData(unImpairedAggrDB, db.UnImpairedData);
};

const pullDailyData = (toDB, fromDB) => {
	rioGrandGauges.forEach((gauge) => {
		var cursor = fromDB.find({ gauge_id: gauge.id }).cursor();
		var aggregateData = {};
		var aggregateCount = {};

		cursor.on('data', (doc) => {
			let mmDD = `${(doc.date.getMonth() + 1)
				.toString()
				.padStart(2, '0')}/${doc.date
				.getDate()
				.toString()
				.padStart(2, '0')}`;

			if (doc.discharge !== null) {
				aggregateData[mmDD] = isNaN(aggregateData[mmDD])
					? 0
					: parseFloat(aggregateData[mmDD]) + parseFloat(doc.discharge);

				aggregateCount[mmDD] = isNaN(aggregateCount[mmDD])
					? 0.0
					: aggregateCount[mmDD] + 1;
			}
		});

		cursor.on('end', () => {
			// console.log(
			// 	`Data: ${Object.values(aggregateData).length} - Count: ${
			// 		Object.values(aggregateCount).length
			// 	}`
			//);
			upLoadAggregateDischargeData(
				aggregateData,
				aggregateCount,
				gauge.id,
				toDB
			);
		});
		cursor.on('error', (err) => {
			throw err;
		});
	});
};

const upLoadAggregateDischargeData = (data, count, gauge_id, aggrDB) => {
	Object.keys(data).forEach((date) => {
		aggrDB
			.create({
				gauge_id: gauge_id,
				date: new Date(date),
				discharge: parseFloat(data[date] / count[date]).toFixed(2),
			})
			.then(() => {})
			.catch((err) => {
				if (err) throw err;
			});
	});
};
