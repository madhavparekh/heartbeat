const express = require('express');

const router = express.Router();
const {
  impaired,
  unImpaired,
  impairedAggregate,
  unImpairedAggreate,
  gauges,
} = require('../controllers');

/* GET api impaired data from gauge_id */
router.get('/api/impaired/gauge/:gauge_id', (req, res) => {
  impaired.show(req, res);
});

/* GET api impaired data from email */
router.get('/api/impaired/gauge/email/:email', (req, res) => {
  impaired.showEmail(req, res);
});

/* GET api unimpaired data from gauge_id */
router.get('/api/unimpaired/gauge/:gauge_id', (req, res) => {
  unImpaired.show(req, res);
});

/* GET api impairedAggregate data from gauge_id */
router.get('/api/impairedaggregate/gauge/:gauge_id', (req, res) => {
  impairedAggregate.show(req, res);
});
/* GET api impaired data from gauge_id */
router.get('/api/unimpairedaggregate/gauge/:gauge_id', (req, res) => {
  unImpairedAggreate.show(req, res);
});

/* GET api Gauge by gauge_id from Gauges */
router.get('/api/gauges/:gauge_id', (req, res) => {
  gauges.findOne(req, res);
});

/* GET api Gauges */
router.get('/api/gauges', (req, res) => {
  gauges.show(req, res);
});

module.exports = router;
