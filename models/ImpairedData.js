var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ImpairedDataSchema object
// This is similar to a Sequelize model
var ImpairedDataSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},

	discharge: {
		type: Number,
		default: null,
	},

	//data belongs to gauges
	gauge_id: {
		type: Schema.Types.String,
		ref: 'Gauges',
	},
});

// This creates our model from the above schema, using mongoose's model method
var ImpairedData = mongoose.model('ImpairedData', ImpairedDataSchema);

// Export the ImpairedData model
module.exports = ImpairedData;
