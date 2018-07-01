const { ImpairedData } = require('../models');

module.exports = {
  show(req, res) {
    return ImpairedData.aggregate([
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
      .catch(err => res.status(400).send(err));
  },
};
