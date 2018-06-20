var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new DailyDataSchema object
// This is similar to a Sequelize model
var DailyDataSchema = new Schema({
	date: {
		type: String,
		default: '1890-01-01',
		required: true,
	},

	discharge_cfs: {
		type: Number,
		get: getCFS(),
		set: setCFS(),
		required: true,
	},
});

function getCFS(num) {
	return (num / 100).toFixed(2);
}

function setCFS(num) {
	return num * 100;
}

// This creates our model from the above schema, using mongoose's model method
var DailyData = mongoose.model('DailyData', DailyDataSchema);

// Export the DailyData model
module.exports = DailyData;
