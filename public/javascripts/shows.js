$(function() {

  var apiRoot1 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot2 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=2&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot3 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=3&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot4 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=4&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot5 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=5&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot6 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=6&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot7 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=7&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var apiRoot8 = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&page=8&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var eventIndex = 0;
  var liked = [];
  var disliked = [];
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
    // $.when( page1(), page2(), page3(), page4(), page5(), page6(), page7(), page8() ).done(function(page1_data, page2_data, page3_data, page4_data, page5_data, page6_data, page7_data, page8_data) {
    $.when( page8() ).done(function(page8_data) {
      //array containing all shows
      var shows = page8_data.resultsPage.results.event;

      function formatShowObj(shows, event, i, j) {
        var performance = shows[i].performance;
        var artists = [];
        var songkick = [];
        for(j = 0; j < performance.length; j++) {
            artists.push(performance[j].artist.displayName);
            songkick.push(performance[j].artist.uri);
        }
        return {
            artist: artists.join(', '),
            name: shows[i].venue.displayName,
            date: moment(shows[i].start.date, "YYYY-MM-DD").format("dddd, MMMM Do"),
            time: moment(shows[i].start.time, "HH:mm:ss").format("h:mm a"),
            songkick: shows[i].uri,
            lat: shows[i].venue.lat,
            lng: shows[i].venue.lng,
            id: shows[i].id
          }
        }

      var venue = formatShowObj(shows, event, eventIndex);

      function displayShow(venue) {
        $('.show').html('<a class="who link" href="' + venue.songkick + '<h2 class="who link">' + venue.artist + '</h2></a>');
        if (venue.name != "Unknown venue") {
          $('.show').append('<h3 class="where"> at ' + venue.name + '</h3>');
        } else {
          $('.show').append('<h3 class="where"> at TBA</h3>');
        }
        if (venue.time === "Invalid date") {
          $('.show').append('<h4 class="when">' + venue.date + ' at TBA </h4>');
        }
        if (venue.time != "Invalid date") {
          $('.show').append('<h4 class="when">' + venue.date + ' at ' + venue.time + '</h4>');
        }
      }

      function dislikeShow() {
        //removes show from shows array and pushes it to disliked array
        eventIndex++;
        var venue = formatShowObj(shows, event, eventIndex);
        displayShow(venue);
      }

      function likeShow() {
        var venue = formatShowObj(shows, event, eventIndex);
        displayShow(venue);
        eventIndex++;

        if (venue.time === "Invalid date" && venue.name === "Unknown venue") {
          $('.itineraryList').append('<li class="event" data-eventId="' + venue.id + '" id="event-' + venue.id + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at TBA</div><div class="listItem">' + venue.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }
        if (venue.time === "Invalid date" && venue.name != "Unknown venue") {
          $('.itineraryList').append('<li class="event" data-eventId="' + venue.id + '" id="event-' + venue.id + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at ' + venue.name + '</div><div class="listItem">' + venue.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }
        if (venue.time != "Invalid date" && venue.name != "Unknown venue") {
          $('.itineraryList').append('<li class="event" data-eventId="' + venue.id + '" id="event-' + venue.id + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at ' + venue.name + '</div><div class="listItem">' + venue.date + '</div><div class="listItem">' + venue.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }
        if (venue.time != "Invalid date" && venue.name === "Unknown venue") {
          $('.itineraryList').append('<li class="event" data-eventId="' + venue.id + '" id="event-' + venue.id + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at TBA</div><div class="listItem">' + venue.date + '</div><div class="listItem">' + venue.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }
      }

      displayShow(venue); // displays next show in array

      $('.yes').click(function(evt) {
        likeShow(); // adds the show to the DB and removes current show from array
        var venue = formatShowObj(shows, event, eventIndex);
        // filter out shows with null values and push to liked array
        if (venue.name != "Unknown venue" &&
          venue.lat != null
        )
          {
            liked.push(venue);
          }

        displayShow(venue);
      });

      $('.no').click(function(evt) {
        dislikeShow(); // removes current show from array
        var venue = formatShowObj(shows, event, eventIndex);
        displayShow(venue); // displays next show in array
        //filter out shows with null values and push to disliked array
        if (venue.name != "Unknown venue" &&
          venue.lat != null
        )
          {
            disliked.push(venue);
            // console.log(disliked);
          }
      });
    })

    .fail(function(err) {
      if (err) throw err;
    })

});
