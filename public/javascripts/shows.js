$(function() {

  var currentDate = moment().format("YYYY-MM-DD");
  var currentYear = moment().year();
  console.log(currentYear);
  var dates = ["2016-03-20", "2016-03-21", "2016-03-22"];


  for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    if (date < currentDate) {
    date = dates[i+1];
    var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=' + currentDate + '&max_date=' + currentYear + '-12-31&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
    }
  }

  var eventIndex = 0;
  var liked = [];

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
      var shows = data.resultsPage.results.event;

      function formatShowObj(event, i) {
        return {
          artist: shows[i].performance[0].artist.displayName,
          venue: shows[i].venue.displayName,
          date: moment(shows[i].start.date, "YYYY-MM-DD").format("dddd, MMMM Do"),
          time: moment(shows[i].start.time, "HH:mm:ss").format("h:mm a"),
          songkick: shows[i].performance[0].artist.uri
        }
      }

      var show = formatShowObj(event, eventIndex);

      $('.no').click(function(evt) {
        dislikeShow(); // removes current show from array
        var show = formatShowObj(event, eventIndex);
        displayShow(show); // displays next show in array
      });

      $('.yes').click(function(evt) {
        likeShow(); // shows the modal, adds the show to the DB, and removes current show from array
        var show = formatShowObj(event, eventIndex);
        displayShow(show);
      });

      displayShow(show); // displays next show in array

      function dislikeShow() {
        eventIndex++;
        var show = formatShowObj(event, eventIndex);
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
            $('.event#' + eventIndex).html('');
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
            $('.event#' + eventIndex).html('');
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
        if (show.time != "Invalid date") {
          $('.show').append('<h4 class="when">' + show.date + ' at ' + show.time + '</h4>');
        }
      }
    })

    .fail(function(err) {
      if (err) throw err;
    })
});
