var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/impaired/gauge/:id', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
