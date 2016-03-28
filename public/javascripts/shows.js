$(function() {

  var map = showMap();
  getLocation(map);
  var liked = [];
  var text = [];

  var myDataRef = new Firebase("https://blinding-torch-1750.firebaseio.com");
  myDataRef.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });

  var currentDate = moment().format("YYYY-MM-DD");
  var dates = ["2016-03-20", "2016-03-21", "2016-03-22"];

  for (var i = 0; i < dates.length; i++) {
    var date = dates[i];
    if (date < currentDate) {
    date = dates[i+1];
    var apiRoot = 'https://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=' + currentDate + '&max_date=2016-04-30&apikey=PTAZie3wbuF6n5dx&jsoncallback=?';
    }
  }

  var eventIndex = 0;

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
        myDataRef.push({artist: show.artist, venue: show.venue, date: show.date, time: show.time, lat: show.lat, lng: show.lng});

        // Retrieve new posts as they are added to our database
        myDataRef.on("child_added", function(snapshot, ChildKey) {
          var newShow = snapshot.val();
          liked.push(newShow.artist, newShow.venue, newShow.date, newShow.time, newShow.lat, newShow.lng);
          text.push(newShow.artist, newShow.venue, newShow.date, newShow.time);

          $('.itineraryList').html('<div class="showArtist">' + newShow.artist + '</div>');

          // function to place a marker on the map
          function dropMarkers(map) {
            for (var i = 0; i < liked.length; i++) {
              var latlng = new google.maps.LatLng(newShow.lat, newShow.lng);
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
              var artist = newShow.artist.replace(/\s/g, '');
              infoWindowHandler(marker, '<a target="blank" id="artist" class="infowindow" href="https://' + artist + '.bandcamp.com"><div class="infowindow" id="artist">' + newShow.artist + '</div></a>' + '<div class="infowindow">' + newShow.venue + '</div>' + '<div class="infowindow">' + moment(newShow.time, "hh:mm:ss a").format("h:mm a") + '</div');
            }
          }
          dropMarkers(map);
        });
        eventIndex++;

        // if (show.time === "Invalid date" && show.venue != "Unknown venue") {
        //   $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
        //   $('.delete').click(function(e) {
        //     e.preventDefault();
        //     myDataRef.on('child_removed', function(oldChildSnapshot) {
        //       oldChildSnapshot.val().remove();
        //     })
        //   })
        // }
        // if (show.time === "Invalid date" && show.venue === "Unknown venue") {
        //   $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at TBA</div><div class="listItem">' + show.date + '</div><div class="listItem"> TBA </div><a href="" class="delete">Remove</a></li>');
        //   $('.delete').click(function(e) {
        //     e.preventDefault();
        //     myDataRef.on('child_removed', function(oldChildSnapshot) {
        //       oldChildSnapshot.val().remove();
        //     })
        //   })
        // }

        // if (show.time != "Invalid date" && show.venue != "Unknown venue") {
        //   $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at ' + show.venue + '</div><div class="listItem">' + show.date + '</div><div class="listItem">' + show.time + '</div><a href="" class="delete">Remove</a></li>');
        //   $('.delete').click(function(e) {
        //     e.preventDefault();
        //     myDataRef.on('child_removed', function(oldChildSnapshot) {
        //       oldChildSnapshot.val().remove();
        //     })
        //   })
        // }
        // if (show.time != "Invalid date" && show.venue === "Unknown venue") {
        //   $('.itineraryList').append('<li class="event" id="' + eventIndex + '"><div class="showArtist">' + show.artist + '</div><div class="listItem"> at TBA </div><div class="listItem">' + show.date + '</div><div class="listItem">' + show.time + '</div><a href="" class="delete">Remove</a></li>');
        //   $('.delete').click(function(e) {
        //     e.preventDefault();
        //     myDataRef.on('child_removed', function(oldChildSnapshot) {
        //       oldChildSnapshot.val().remove();
        //     })
        //   })
        // }
      console.log(liked);
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

    // function to get user's current location
    function getLocation(map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          showPosition(map, position);
          // getLikes(map, position);
        }, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
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

    // function to show user's current position on the map
    function showPosition(map, position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      latlon = new google.maps.LatLng(lat, lon);

      var marker = new google.maps.Marker({position:latlon,map:map});

      var myCity = new google.maps.Circle({
        center:latlon
        // radius:536.447946355,
        // strokeColor:"#DD1C1A",
        // strokeOpacity:0.4,
        // strokeWeight:2,
        // fillColor:"#DD1C1A",
        // fillOpacity:0.1
      });
      myCity.setMap(map);

      map.panTo(latlon);
      map.setZoom(15);

      $('#recenter').click(function() {
        map.panTo(latlon);
        map.setZoom(15);
      })
    }

      // function to show an error if user denies access to current location
    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
      }
    }
});
