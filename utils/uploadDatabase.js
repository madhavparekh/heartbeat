var axios = require('axios');
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
		column1: 'omit',
		column5: 'omit',
		discharge: (discharge) => {
			return parseFloat(discharge).toFixed(2);
		},
	},
};

const params4IBWC = {
	noheader: true,
	delimiter: [' '],
	ignoreEmpty: true,
};

exports.uploadDailyDataDatabase = async () => {
	var today = new Date(Date.now());
	today = today.toISOString().split('T')[0];

	try {
		await db.DailyData.deleteMany();

		await rioGrandGauges.forEach((gauge) => {
			var url =
				usgsDataURL.replace('00000000', gauge.id.toString().padStart('0', 9)) +
				today;
			if (gauge.agency === 'USGS') {
				axios.get(url).then((response) => {
					var data = response.data
						.slice(response.data.lastIndexOf('10s') + '10s'.length + 1)
						.trim();

					csv(params4USGS)
						.fromString(data)
						.then((jsonArr) => {
							db.DailyData.insertMany(jsonArr).catch((err) => {
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
					// fs.appendFile(__dirname + '/../Notes/tmp.csv', data);
					// fs.appendFile(
					// 	__dirname + '/../Notes/tmp.csv',
					// 	'#####################\n'
					// );

					csv(params4IBWC)
						.fromString(data)
						.then((jsonArr) => {
							//fs.writeFile(__dirname + '/../Notes/tmp.json', );
							var objArr = [];
							jsonArr.forEach((json, indx) => {
								var obj = {
									gauge_id: gauge.id,
								};

								Object.keys(json).map((key, indx) => {
									if (indx === 0) obj.date = json[key];
									if (indx === 1)
										obj.discharge =
											json[key] === 'NR'
												? 0.0
												: (json[key] * 35.3147).toFixed(2); //cms to cfs
								});
								objArr.push(obj);
							});
							db.DailyData.insertMany(objArr).catch((err) => {
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
