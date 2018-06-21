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
		type: Date,
		default: new Date('1890-01-01'),
		get: getLDP,
		required: true,
	},

	//gauge belongs to River
	river: {
		type: Schema.Types.ObjectId,
		ref: 'Rivers',
	},
});

//get Date in YYYY-MM-DD format
function getLDP(date) {
	return date.toISOString().split('T')[0];
}

// This creates our model from the above schema, using mongoose's model method
var Gauges = mongoose.model('Gauges', GaugesSchema);

// Export the Gauges model
module.exports = Gauges;
