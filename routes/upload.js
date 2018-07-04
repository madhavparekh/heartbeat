const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET api impaired data from gauge_id */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`It worked! User id is: ${req.user._id}.`); //eslint-disable-line
});

module.exports = router;
