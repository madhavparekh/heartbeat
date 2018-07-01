require('dotenv').config();
const axios = require('axios');
const request = require('request');
const csv = require('csvtojson');
const db = require('../models');

const usgsDataURL =	'https://waterdata.usgs.gov/nwis/dv?cb_00060=on&format=rdb&site_no=00000000&referred_module=sw&period=&begin_date=1899-07-01&end_date='; //eslint-disable-line

const rioGrandeGauges = db.Gauges.find().catch(err => err);

const params4USGS = {
  noheader: true,
  headers: ['agency', 'gauge_id', 'date', 'discharge', 'discharge_data_type'],
  delimiter: 'auto',
  colParser: {
    date: date => new Date(date),
    discharge: discharge => parseFloat(discharge).toFixed(2),
    gauge_id: gauge => gauge.toString().padStart(8, 0),
    column1: 'omit',
    column5: 'omit',
  },
  ignoreEmpty: true,
};

const params4UNIMPAIRED = {
  noheader: false,
  delimiter: 'auto',
  colParser: {
    date: date => new Date(date),
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

const updateLastPulledDate = () => {
  db.ImpairedData.aggregate(
    [
      {
        $group: {
          _id: '$gauge_id',
          date: { $max: '$date' },
        },
      },
    ],
    (err, docs) => {
      if (err) throw err;

      docs.forEach((doc) => {
        db.Gauges.update(
					{ gauge_id: doc._id }, //eslint-disable-line
          { $set: { last_date_pulled: doc.date } },
        ).catch(error => error);
      });
    },
  );
};

exports.uploadUnimpairedDatabase = async () => {
  const headers = ['date', 'year', 'month', 'day'];

  rioGrandeGauges.forEach(gauge => headers.push(gauge.gauge_id));

  params4UNIMPAIRED.headers = headers;

  try {
    db.UnImpairedData.deleteMany().catch((err) => {
      if (err) throw err;
    });
    csv(params4UNIMPAIRED)
      .fromStream(request.get(process.env.UNIMPAIRED_FILE_URL))
      .on('data', (res) => {
        const data = JSON.parse(res);
        const objArr = [];
        // console.log(data);

        rioGrandeGauges.forEach((gauge) => {
          const obj = {
            gauge_id: gauge.gauge_id,
            discharge: data[gauge.gauge_id]
              ? parseFloat(data[gauge.gauge_id]).toFixed(2)
              : null,
            date: data.date,
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
  let today = new Date(Date.now());
	today = today.toISOString().split('T')[0]; //eslint-disable-line

  try {
    rioGrandeGauges.forEach((gauge) => {
      // get last pulled date and add a 1 day to it
      const pullFromDate = new Date(gauge.last_date_pulled);
      pullFromDate.setDate(pullFromDate.getDate() + 1);

      let url = usgsDataURL.replace(
        '1899-07-01',
        pullFromDate.toISOString().split('T')[0],
      );

      url = url.replace('00000000', gauge.gauge_id) + today;

      if (gauge.agency === 'USGS') {
        axios.get(url).then((response) => {
          const data = response.data
            .slice(response.data.lastIndexOf('10s') + '10s'.length + 1)
            .trim();

          csv(params4USGS)
            .fromString(data)
            .then((jsonArr) => {
              db.ImpairedData.insertMany(jsonArr).catch(err => err);
            });
        });
      } else if (gauge.agency === 'IBWC') {
        // delete all records for gauge first
        // -- need to fix this by parsing and trimming html res to last pulled date
        db.ImpairedData.deleteMany({ gauge_id: gauge.gauge_id }).catch(
          (err) => {
            if (err) throw err;
          },
        );

        params4IBWC.output = 'json';
        axios.get(gauge.data_url).then((response) => {
          let data = response.data
            .slice(
              response.data.lastIndexOf('REVISION') + 'REVISION'.length + 1,
            )
            .trim();
          data = data.replace('</PRE>', '').trim();
          data = data.replace('</BODY>', '').trim();
          data = data.replace('</HTML>', '').trim();

          csv(params4IBWC)
            .fromString(data)
            .then((jsonArr) => {
              const objArr = [];
              jsonArr.forEach((json) => {
                const obj = {
                  gauge_id: gauge.gauge_id,
                };
                // prettier-ignore
								Object.keys(json).map((key, indx) => {//eslint-disable-line
                  if (indx === 0) obj.date = new Date(json[key]);
                  if (indx === 1) {
                    obj.discharge = json[key] === 'NR' ? null : (json[key] * 35.3147).toFixed(2);
                  } // cms to cfs
                });
                objArr.push(obj);
              });
              db.ImpairedData.insertMany(objArr).catch(err => err);
            });
        });
      }
    });

    // update Gauges collection with last pulled date
    updateLastPulledDate();
  } catch (err) {
    throw err;
  }
};

const upLoadAggregateDischargeData = (data, count, gaugeId, aggrDB) => {
  Object.keys(data).forEach((date) => {
    aggrDB
      .create({
        gaugeId,
        date: new Date(date),
        discharge: parseFloat(data[date] / count[date]).toFixed(2),
      })
      .then(() => {})
      .catch((err) => {
        if (err) throw err;
      });
  });
};

const pullDailyData = (toDB, fromDB) => {
  rioGrandeGauges.forEach((gauge) => {
    const cursor = fromDB.find({ gauge_id: gauge.gauge_id }).cursor();
    const aggregateData = {};
    const aggregateCount = {};

    cursor.on('data', (doc) => {
      const mmDD = `${(doc.date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${doc.date
        .getDate()
        .toString()
        .padStart(2, '0')}`;

      if (doc.discharge !== null) {
        aggregateData[mmDD] = Number.isNaN(aggregateData[mmDD])
          ? 0
          : parseFloat(aggregateData[mmDD]) + parseFloat(doc.discharge);

        aggregateCount[mmDD] = Number.isNaN(aggregateCount[mmDD])
          ? 0.0
          : aggregateCount[mmDD] + 1;
      }
    });

    cursor.on('end', () => {
      upLoadAggregateDischargeData(
        aggregateData,
        aggregateCount,
        gauge.gauge_id,
        toDB,
      );
    });
    cursor.on('error', (err) => {
      throw err;
    });
  });
};

exports.uploadAggregateData = async () => {
  const impairedAggrDB = db.ImpairedAggregateData;
  const unImpairedAggrDB = db.UnImpairedAggregateData;

  await impairedAggrDB.deleteMany({});
  await unImpairedAggrDB.deleteMany({});

  pullDailyData(impairedAggrDB, db.ImpairedData);
  pullDailyData(unImpairedAggrDB, db.UnImpairedData);
};
