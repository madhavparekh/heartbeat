var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new DailyDataSchema object
// This is similar to a Sequelize model
var DailyDataSchema = new Schema({
	date: {
		type: Date,
		get: getRecordDate,
		required: true,
	},

	discharge_cfs: {
		type: Number,
		get: getCFS,
		set: setCFS,
		required: true,
	},

	//data belongs to gauges
	gauge: {
		type: Schema.Types.ObjectId,
		ref: 'Gauges',
	},
});

//get discharge flow in decimal(2)
function getCFS(num) {
	return (num / 100).toFixed(2);
}
//set discharge flow from decimal to whole number
function setCFS(num) {
	return num * 100;
}

//get Date in YYYY-MM-DD format
function getRecordDate(date) {
	return date.toISOString().split('T')[0];
}

// This creates our model from the above schema, using mongoose's model method
var DailyData = mongoose.model('DailyData', DailyDataSchema);

// Export the DailyData model
module.exports = DailyData;
