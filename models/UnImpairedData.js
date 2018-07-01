const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema; //eslint-disable-line

// Using the Schema constructor, create a new UnImpairedDataSchema object
// This is similar to a Sequelize model
const UnImpairedDataSchema = new Schema({
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
const UnImpairedData = mongoose.model('UnImpairedData', UnImpairedDataSchema);

// Export the UnImpairedData model
module.exports = UnImpairedData;
