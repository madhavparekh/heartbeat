// Exporting an object containing all of our models
const River = require('./Rivers');
const Gauges = require('./Gauges');
const ImpairedData = require('./ImpairedData');
const ImpairedAggregateData = require('./ImpairedAggregateData');
const UnImpairedData = require('./UnImpairedData');
const UnImpairedAggregateData = require('./UnImpairedAggregateData');
const User = require('./User');

module.exports = {
  River,
  Gauges,
  ImpairedData,
  ImpairedAggregateData,
  UnImpairedData,
  UnImpairedAggregateData,
  User,
};
