  // var map = showMap();

  // function getVenues(map) {

  // }

  // dropMarkers(map, venues);

  //   // function to place a marker on the map
  // function dropMarkers(map, venues) {
  //   for (var i = 0; i < venues.length; i++) {
  //     var latlng = new google.maps.LatLng(venues[i].lat, venues[i].lng);
  //     var marker = new google.maps.Marker({
  //       position: latlng,
  //       icon: 'images/microphone.png',
  //       map: map
  //     });

  //     function infoWindowHandler(marker, content) {
  //       google.maps.event.addListener(marker, 'click', function(){
  //         var infowindow = new google.maps.InfoWindow({
  //           content: content
  //         });
  //         infowindow.close();
  //         infowindow.open(map, marker);
  //       });
  //     }
  //     var artist = venues[i].artist.replace(/\s/g, '');
  //     infoWindowHandler(marker, '<a target="blank" id="artist" class="infowindow" href="https://' + artist + '.bandcamp.com"><div class="infowindow" id="artist">' + venues[i].artist + '</div></a>' + '<div class="infowindow">' + venues[i].name + '</div>' + '<div class="infowindow">' + moment(venues[i].time, "hh:mm:ss").format("h:mm a") + '</div');
  //   }
  // }

  // //function to show map
  // function showMap() {
  //   var latlon =  new google.maps.LatLng(30.2669444, -97.7427778);
  //   var myOptions = {
  //     center:latlon,zoom:15,
  //     mapTypeId:google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl:false,
  //     fullscreenControl: true,
  //     navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  //   }

  //   var mapholder = document.getElementById('mapholder');
  //   mapholder.style.height = '345px';
  //   mapholder.style.width = '650px';

  //   var map = new google.maps.Map(mapholder, myOptions);

  //   // listen for the window resize event & trigger Google Maps to update
  //   $(window).resize(function() {
  //     google.maps.event.trigger(map, "resize");
  //   });
  //   return map;
  // }
