const { Gauges } = require('../models');

module.exports = {
  show(req, res) {
    return Gauges.find({})
      .then(Gauges => res.status(200).send(Gauges))
      .catch(err => res.status(400).send(err));
  },
  findOne(req, res) {
    return Gauges.find({ gauge_id: req.params.gauge_id })
      .then(gauge => res.status(200).send(gauge))
      .catch(err => res.status(400).send(err));
  },
};
