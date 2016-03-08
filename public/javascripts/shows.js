$(function() {
  var map = showMap();
  var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
  var eventIndex = 0;
  var venues = [];

  function getVenues(map) {

  }

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
            songkick: shows[i].performance[0].artist.uri,
            lat: shows[i].venue.lat,
            lng: shows[i].venue.lng
          }
        }

      dropMarkers(map, venues);

      var venue = formatShowObj(event, eventIndex);

      $('.no').click(function(evt) {
        dislikeShow(); // removes current show from array
        var venue = formatShowObj(event, eventIndex);
        displayShow(venue); // displays next show in array
      });

      $('.yes').click(function(evt) {
        likeShow(); // shows the modal, adds the show to the DB, and removes current show from array
        var venue = formatShowObj(event, eventIndex);
        displayShow(venue);
        // function to filter out shows with null values
        if (venue.name != "Unknown venue" &&
          venue.lat != null
        )
          {
            venues.push(venue);
            console.log(venues);
          }
      });

      displayShow(venue); // displays next show in array

      function dislikeShow() {
        eventIndex++;
        var venue = formatShowObj(event, eventIndex);
        displayShow(venue);
      }

      function likeShow() {
        var venue = formatShowObj(event, eventIndex);
        displayShow(venue);
        eventIndex++;

        if (venue.time === "Invalid date") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at ' + venue.venue + '</div><div class="listItem">' + venue.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#' + eventIndex).html('');
          })
        }
        if (venue.time != "Invalid date") {
          $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + venue.artist + '</div><div class="listItem"> at ' + venue.venue + '</div><div class="listItem">' + venue.date + '</div><div class="listItem">' + venue.time + '</div><a href="" class="delete">Remove</a></li>');
          $('.delete').click(function(e) {
            e.preventDefault();
            $('.event#' + eventIndex).html('');
          })
        }
      }

      function displayShow(venue) {
        $('.show').html('<a class="who link" href="' + venue.songkick + '<h2 class="who link">' + venue.artist + '</h2></a>');
        $('.show').append('<h3 class="where"> at ' + venue.venue + '</h3>');
        if (venue.time === "Invalid date") {
          $('.show').append('<h4 class="when">' + venue.date + ' at TBA </h4>');
        }
        if (venue.time != "Invalid date") {
          $('.show').append('<h4 class="when">' + venue.date + ' at ' + venue.time + '</h4>');
        }
      }
    })

    .fail(function(err) {
      if (err) throw err;
    })

    // function to place a marker on the map
  function dropMarkers(map, venues) {
    for (var i = 0; i < venues.length; i++) {
      var latlng = new google.maps.LatLng(venues[i].lat, venues[i].lng);
      var marker = new google.maps.Marker({
        position: latlng,
        icon: 'images/microphone.png',
        map: map
      });

      function infoWindowHandler(marker, content) {
        google.maps.event.addListener(marker, 'click', function(){
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          infowindow.close();
          infowindow.open(map, marker);
        });
      }
      var artist = venues[i].artist.replace(/\s/g, '');
      infoWindowHandler(marker, '<a target="blank" id="artist" class="infowindow" href="https://' + artist + '.bandcamp.com"><div class="infowindow" id="artist">' + venues[i].artist + '</div></a>' + '<div class="infowindow">' + venues[i].name + '</div>' + '<div class="infowindow">' + moment(venues[i].time, "hh:mm:ss").format("h:mm a") + '</div');
    }
  }

  //function to show map
  function showMap() {
    var latlon =  new google.maps.LatLng(30.2669444, -97.7427778);
    var myOptions = {
      center:latlon,zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      fullscreenControl: true,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var mapholder = document.getElementById('mapholder');
    mapholder.style.height = '345px';
    mapholder.style.width = '650px';

    var map = new google.maps.Map(mapholder, myOptions);

    // listen for the window resize event & trigger Google Maps to update
    $(window).resize(function() {
      google.maps.event.trigger(map, "resize");
    });
    return map;
  }
});
