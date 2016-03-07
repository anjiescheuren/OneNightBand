$(function() {
  var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var eventIndex = 0;
  var liked = [];

  $.ajax({
      url: apiRoot,
      method: "GET",
      data: {},
      dataType: "jsonp",
      jsonCallback: "info"

    })
    .done(function(data) {
      var shows = data.resultsPage.results.event;
      console.log(shows[0].performance[0].artist.displayName);

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

      // console.log(show.artist);

      $('.no').click(function(evt) {
        dislikeShow(); // removes current show from array
        var show = formatShowObj(event, eventIndex);
        displayShow(show); // displays next show in array
      });

      $('.yes').click(function(evt) {

        //shows.shift();
        likeShow(); // shows the modal, adds the show to the DB, and removes current show from array
        var show = formatShowObj(event, eventIndex);
        displayShow(show);


      });

      $('.ok').click(function(evt) {
        //displayShow(show); // displays next show in array
      });

      displayShow(show); // displays next show in array

      function dislikeShow() {
        eventIndex++;
        var show = formatShowObj(event, eventIndex);
        displayShow(show);
      }

      function likeShow() {
        var show = formatShowObj(event, eventIndex);

        $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
        $('.show').append('<h3 class="where"> at ' + show.venue + '</h3>');
        var time = show.time;

        if (time === "Invalid date") {
          $('.itineraryList').append('<li class="event"><div class="showArtist">' + show.artist + '</div>' + '<div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event').html('');
          })
        }
        if (time != "Invalid date") {
          $('.itineraryList').append('<li class="event"><div class="showArtist">' + show.artist + '</div>' + '<div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem">' + time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event').html('');
          })
        }
        // var artist = shows[eventIndex].performance[0].artist.displayName;
        // var venue = shows[eventIndex].venue.displayName;
        // var showDate = shows[eventIndex].start.date;
        // var time = shows[eventIndex].start.time;
        // if (time === "Invalid date") {
        //   var nullTime = "TBA";
        //   liked.push(artist, venue, date, nullTime);
        // }
        // if (time != "Invalid date") {
        //   var newTime = time.split(':');
        //   var hours = Number(newTime[0]);
        //   var minutes = Number(newTime[1]);
        //   var time = "" + ((hours > 12) ? hours - 12 : hours); // get hours
        //   time += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
        //   time += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
        //   liked.push(artist, venue, date, time);
        // }

        eventIndex++;
      }

      function displayShow(show) {
        // console.log(show);

        var date = show.date;

        $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
        $('.show').append('<h3 class="where"> at ' + show.venue + '</h3>');
        var time = show.time;
        if (time === "Invalid date") {
          $('.show').append('<h4 class="when">' + show.date + ' at TBA </h4>');
        }
        if (time != "Invalid date") {
          $('.show').append('<h4 class="when">' + show.date + ' at ' + time + '</h4>');
        }
      }
    })
    .always(function(data) {

    })
    .fail(function(err) {
      if (err) throw err;
    })

  $('.itinerary').click(function() {
    window.location.replace("localhost:3000/itinerary");
  })
});
