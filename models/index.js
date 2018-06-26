// Exporting an object containing all of our models

module.exports = {
	River: require('./Rivers'),
	Gauges: require('./Gauges'),
	DailyData: require('./DailyData'),
	AggregateData: require('./AggregateData'),
	UnImpairedData: require('./UnImpairedData'),
	UnImpairedAggregateData: require('./UnImpairedAggregateData'),
};
