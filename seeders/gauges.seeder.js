const Seeder = require('mongoose-data-seed').Seeder; //eslint-disable-line
const Model = require('../models/Gauges');

const { rioGrandeGauges } = require('../static/rioGrandeGauges');

const GaugesSeeder = Seeder.extend({
  shouldRun() {
    return Model.count()
      .exec()
      .then(count => count === 0);
  },
  run() {
    return Model.create(rioGrandeGauges);
  },
});

module.exports = GaugesSeeder;
