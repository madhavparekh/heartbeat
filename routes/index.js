var express = require('express');
var router = express.Router();
var {
	impaired,
	unImpaired,
	impairedAggregate,
	unImpairedAggreate,
	gauges,
	users,
} = require('../controllers');

/* GET api impaired data from gauge_id*/
router.get('/api/impaired/gauge/:gauge_id', (req, res) => {
	console.log(req.params.gauge_id);
	impaired.show(req, res);
});

/* GET api unimpaired data from gauge_id*/
router.get('/api/unimpaired/gauge/:gauge_id', (req, res) => {
	unImpaired.show(req, res);
});

/* GET api impairedAggregate data from gauge_id*/
router.get('/api/impairedaggregate/gauge/:gauge_id', (req, res) => {
	impairedAggregate.show(req, res);
});
/* GET api impaired data from gauge_id*/
router.get('/api/unimpairedaggregate/gauge/:gauge_id', (req, res) => {
	unImpairedAggreate.show(req, res);
});

/* GET api Gauge by gauge_id from Gauges*/
router.get('/api/gauges/:gauge_id', (req, res) => {
	console.log(req.params.gauge_id);
	gauges.findOne(req, res);
});

/* GET api Gauges*/
router.get('/api/gauges', (req, res) => {
	gauges.show(req, res);
});

module.exports = router;
