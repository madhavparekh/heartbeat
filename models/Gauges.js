const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new GaugesSchema object
// This is similar to a Sequelize model
const GaugesSchema = new Schema({
  // `gauge_id` is required and of type Number
  gauge_id: {
    type: String,
    required: true,
  },

  agency: {
    type: String,
    default: 'USGS',
    required: true,
  },

  // `description` is required and of type String
  description: {
    type: String,
    required: true,
  },
  // geo location
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  // for IBWC gauges only
  data_url: {
    type: String,
  },

  last_date_pulled: {
    type: Date,
    required: true,
  },

  // gauge belongs to River
  river: {
    type: Schema.Types.ObjectId,
    ref: 'Rivers',
  },
});

// This creates our model from the above schema, using mongoose's model method
const Gauges = mongoose.model('Gauges', GaugesSchema);

// Export the Gauges model
module.exports = Gauges;
