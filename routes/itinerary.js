var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itinerary', { title: 'OneNightBand', list: 'oneband'});
  console.log('hello');
});

module.exports = router;
