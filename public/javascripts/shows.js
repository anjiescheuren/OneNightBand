$(function() {
  var myDataRef = new Firebase('https://u7wiyuvlbvi.firebaseio-demo.com/');
  var currentDate = moment().format("YYYY-MM-DD");
  var dates = ["2016-03-20", "2016-03-21", "2016-03-22"];

  for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    if (date < currentDate) {
    date = dates[i+1];
    var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=' + currentDate + '&max_date=2016-03-25&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
    }
  }

  var eventIndex = 0;
  var liked = [];
  var disliked = [];

  var myDataRef = new Firebase("https://blinding-torch-1750.firebaseio.com");
  myDataRef.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });

  $.ajax({
      url: apiRoot,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info"
    })

    .done(function(data) {
      //array containing all shows
      var shows = data.resultsPage.results.event;

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

      var show = formatShowObj(shows, event, eventIndex);

      // function displayShow(show) {
      //   $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
      //   if (show.name != "Unknown venue") {
      //     $('.show').append('<h3 class="where"> at ' + show.name + '</h3>');
      //   } else {
      //     $('.show').append('<h3 class="where"> at TBA</h3>');
      //   }
      //   if (show.time === "Invalid date") {
      //     $('.show').append('<h4 class="when">' + show.date + ' at TBA </h4>');
      //   }
      //   if (show.time != "Invalid date") {
      //     $('.show').append('<h4 class="when">' + show.date + ' at ' + show.time + '</h4>');
      //   }
      // }

      function dislikeShow() {
        //removes show from shows array and pushes it to disliked array
        eventIndex++;
        var show = formatShowObj(shows, event, eventIndex);
        displayShow(show);
      }

      function likeShow() {

        var show = formatShowObj(event, eventIndex);
        displayShow(show);
        myDataRef.push({artist: show.artist, venue: show.venue, date: show.date, time: show.time});
        eventIndex++;

        if (show.time === "Invalid date" && show.venue != "Unknown venue") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }

        if (show.time === "Invalid date" && show.venue === "Unknown venue") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at TBA</div><div class="listItem">' + show.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#' + eventIndex).html('');
          })
        }

        if (show.time != "Invalid date" && show.venue != "Unknown venue") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem">' + show.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + venue.id).html('');
          })
        }

        if (show.time != "Invalid date" && show.venue === "Unknown venue") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at TBA </div><div class="listItem">' + show.date + '</div><div class="listItem">' + show.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#' + eventIndex).html('');
          })
        }
      }

      function displayShow(show) {
        $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
        if (show.venue === "Unknown venue") {
          $('.show').append('<h3 class="where"> at TBA </h3>');
        }
        else {
          $('.show').append('<h3 class="where"> at ' + show.venue + '</h3>');
        }
        if (show.time === "Invalid date") {
          $('.show').append('<h4 class="when">' + show.date + ' at TBA </h4>');
        }
        if (show.time != "Invalid date" && show.name === "Unknown venue") {
          $('.itineraryList').append('<li class="event" data-eventId="' + show.id + '" id="event-' + show.id + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at TBA</div><div class="listItem">' + show.date + '</div><div class="listItem">' + show.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#event-' + show.id).html('');
          })
        }
      }

      displayShow(show); // displays next show in array

      $('.yes').click(function(evt) {
        likeShow(); // adds the show to the DB and removes current show from array
        var show = formatShowObj(shows, event, eventIndex);
        // filter out shows with null values and push to liked array
        if (show.name != "Unknown show" &&
          show.lat != null
        )
          {
            liked.push(show);
          }

        displayShow(show);
      });

      $('.no').click(function(evt) {
        dislikeShow(); // removes current show from array
        var show = formatShowObj(shows, event, eventIndex);
        displayShow(show); // displays next show in array
        //filter out shows with null values and push to disliked array
        if (show.name != "Unknown venue" &&
          show.lat != null
        )
          {
            disliked.push(show);
            // console.log(disliked);
          }
      });
    })

    .fail(function(err) {
      if (err) throw err;
    })
})
