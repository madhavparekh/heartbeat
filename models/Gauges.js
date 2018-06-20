var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new GaugesSchema object
// This is similar to a Sequelize model
var GaugesSchema = new Schema({
	// `usgs_site_no` is required and of type Number
	usgs_site_no: {
		type: Number,
		required: true,
	},

	// `description` is required and of type String
	description: {
		type: String,
		required: true,
	},
	//geo location
	latitude: {
		type: String,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},

	last_date_pulled: {
		type: String,
		default: '1890-01-01',
		required: true,
	},

	// `dailyData` is an object that stores a DailyData id
	// The ref property links the ObjectId to the DailyData model
	// This allows us to populate the Gauge with an associated DailyData
	dailyData: [
		{
			type: Schema.Types.ObjectId,
			ref: 'DailyData',
		},
	],
});

// This creates our model from the above schema, using mongoose's model method
var Gauges = mongoose.model('Gauges', GaugesSchema);

// Export the Gauges model
module.exports = Gauges;
