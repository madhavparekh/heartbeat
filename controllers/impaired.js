const { ImpairedData, UnImpairedData } = require('../models');

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  // console.log(date);
  return date;
};

module.exports = {
  async show(req, res) {
    const impaired = await ImpairedData.aggregate([
      { $match: { gauge_id: req.params.gauge_id } },
      {
        $group: {
          _id: {},
          minDate: { $min: '$date' },
          maxDate: { $max: '$date' },
        },
      },
    ]);

    const unImpaired = await UnImpairedData.aggregate([
      { $match: { gauge_id: req.params.gauge_id } },
      {
        $group: {
          _id: {},
          minDate: { $min: '$date' },
          maxDate: { $max: '$date' },
        },
      },
    ]);

		let impMinDate = new Date(impaired[0].minDate); //eslint-disable-line
		let unImpMinDate = new Date(unImpaired[0].minDate); //eslint-disable-line
    // let impMaxDate = new Date(impaired[0].maxDate); //eslint-disable-line
    // let unImpMaxDate = new Date(unImpaired[0].maxDate); //eslint-disable-line

    const promiseAry = [];

    // fill dates in the front
    for (unImpMinDate; unImpMinDate < impMinDate; unImpMinDate = unImpMinDate.addDays(1)) {
      promiseAry.push(
        ImpairedData.create({
          gauge_id: req.params.gauge_id,
          date: unImpMinDate.toISOString().split('T')[0],
          discharge: -1,
        }),
      );
    }

    Promise.all(promiseAry).then(() => ImpairedData.aggregate([
      { $match: { gauge_id: req.params.gauge_id, discharge: { $ne: null } } },
      {
        $project: {
          _id: 0,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          discharge: 1,
        },
      },
      { $sort: { date: 1 } },
    ])
      .then((impairedData) => {
        res.status(200).send(impairedData);
      })
      .catch(err => res.status(400).send(err)));

    // // fill dates in the end
    // unImpMaxDate = unImpMaxDate.addDays(1);
    // for (unImpMaxDate; unImpMaxDate <= impMaxDate; unImpMaxDate = unImpMaxDate.addDays(1)) {
    //   ImpairedData.create({
    //     gauge_id: req.params.gauge_id,
    //     date: unImpMaxDate.toISOString().split('T')[0],
    //     discharge: -1,
    //   });
    // }
  },

  showEmail(req, res) {
    return ImpairedData.aggregate([
      { $match: { email: req.params.email, discharge: { $ne: null } } },
      {
        $project: {
          _id: 0,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          discharge: 1,
        },
      },
      { $sort: { date: 1 } },
    ])
      .then((impairedData) => {
        res.status(200).send(impairedData);
      })
      .catch(err => res.status(400).send(err));
  },
};
