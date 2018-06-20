var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new RiversSchema object
// This is similar to a Sequelize model
var RiversSchema = new Schema({
	// `name` is required and of type String
	name: {
		type: String,
		required: true,
	},

	// `gagues` is an object that stores a gauge id
	// The ref property links the ObjectId to the Gauges model
	// This allows us to populate the River with an associated Gauges
	gauges: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Gauges',
		},
	],
});

// This creates our model from the above schema, using mongoose's model method
var Rivers = mongoose.model('Rivers', RiversSchema);

// Export the Rivers model
module.exports = Rivers;
