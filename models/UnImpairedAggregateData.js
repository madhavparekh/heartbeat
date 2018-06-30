var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UnImpairedAggregateDataSchema object
// This is similar to a Sequelize model
var UnImpairedAggregateDataSchema = new Schema({
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
var UnImpairedAggregateData = mongoose.model(
	'UnImpairedAggregateData',
	UnImpairedAggregateDataSchema
);

// Export the UnImpairedAggregateData model
module.exports = UnImpairedAggregateData;
