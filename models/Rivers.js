const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;//eslint-disable-line

// Using the Schema constructor, create a new RiversSchema object
// This is similar to a Sequelize model
const RiversSchema = new Schema({
  // `name` is required and of type String
  name: {
    type: String,
    required: true,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Rivers = mongoose.model('Rivers', RiversSchema);

// Export the Rivers model
module.exports = Rivers;
