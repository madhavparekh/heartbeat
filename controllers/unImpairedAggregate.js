var { UnImpairedAggregateData } = require('../models');

module.exports = {
	show(req, res) {
		return UnImpairedAggregateData.aggregate([
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
			.then((UnImpairedAggregateData) =>
				res.status(200).send(UnImpairedAggregateData)
			)
			.catch((err) => res.status(400).send(err));
	},
};