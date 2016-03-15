var express = require('express');
var router = express.Router();
// Twilio Credentials
var accountSid = 'ACdf7d35b9d29aa6c91b56084fafb2e38b';
var authToken = 'c5417a84cf54025a7e54810467e72cfc';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OneNightBand'});
});

router.post('/', function(req, res, next) {
    // Twilio Credentials
    var accountSid = 'ACdf7d35b9d29aa6c91b56084fafb2e38b';
    var authToken = 'c5417a84cf54025a7e54810467e72cfc';
    var recipient = req.body.to;
    var textMessage = req.body.message;



    //require the Twilio module and create a REST client
    // var client = require('twilio')(accountSid, authToken);
    var client = require('twilio')(accountSid, authToken);
    client.messages.create({
        to: recipient,
        from: "+15129826236",
        body: textMessage,
    }, function(err, data) {
        if(err) {
          console.log(err);
        }
        console.log(data.sid);
    });

    res.render('index', {
        title: 'OneNightBand'
    });
});


module.exports = router;
