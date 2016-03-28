var apiRoot2 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=2&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot3 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=3&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot4 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=4&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot5 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=5&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot6 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=6&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot7 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=7&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot8 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=8&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var pages = ["page=1", "page=2", "page=3", "page=4", "page=5", "page=6", "page=7", "page=8"];
  for(var p = 0; p < pages.length; p++) {
    var page = pages[p];
    // var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&' + page + '&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
    // console.log(apiRoot);
  }

  function page1() {
      return $.ajax({
      url: apiRoot1,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page1_data) {
      }
    });
  }

  function page2() {
      return $.ajax({
      url: apiRoot2,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page2_data) {
      }
    });
  }

  function page3() {
    return $.ajax({
      url: apiRoot3,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page3_data) {
      }
    });
  }
  function page4() {
    return $.ajax({
      url: apiRoot4,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page4_data) {
      }
    });
  }
  function page5() {
    return $.ajax({
      url: apiRoot5,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page5_data) {
      }
    });
  }
  function page6() {
    return $.ajax({
      url: apiRoot6,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page6_data) {
      }
    });
  }
  function page7() {
    return $.ajax({
      url: apiRoot7,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page7_data) {
      }
    });
  }
  function page8() {
    return $.ajax({
      url: apiRoot8,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info",
      success: function(page8_data) {
      }
    });
  }
