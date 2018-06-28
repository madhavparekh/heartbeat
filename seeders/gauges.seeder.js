var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../models/Gauges');

var { rioGrandeGauges } = require('../static/rioGrandeGauges');

var GaugesSeeder = Seeder.extend({
	shouldRun: function() {
		return Model.count()
			.exec()
			.then((count) => count === 0);
	},
	run: function() {
		return Model.create(rioGrandeGauges);
	},
});

module.exports = GaugesSeeder;
