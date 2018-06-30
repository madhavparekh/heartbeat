var express = require('express');
var router = express.Router();
var {
	impaired,
	unImpaired,
	impairedAggregate,
	unImpairedAggreate,
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

module.exports = router;
