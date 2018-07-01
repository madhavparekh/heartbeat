const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;//eslint-disable-line

// Using the Schema constructor, create a new ImpairedAggregateDataSchema object
// This is similar to a Sequelize model
const ImpairedAggregateDataSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  discharge: {
    type: Number,
    default: null,
  },

  // data belongs to gauges
  gauge_id: {
    type: Schema.Types.String,
    ref: 'Gauges',
  },
});

// This creates our model from the above schema, using mongoose's model method
const ImpairedAggregateData = mongoose.model(
  'ImpairedAggregateData',
  ImpairedAggregateDataSchema,
);

// Export the ImpairedAggregateData model
module.exports = ImpairedAggregateData;
