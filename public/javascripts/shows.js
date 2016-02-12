$(function() {
    var apiRoot = 'http://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx';
    var eventIndex = 0;
    var array = ['a', 'b', 'c'];
    $.ajax({
            url: apiRoot,
            method: "GET",
            data: {},
            dataType: "json"
        })
        .done(function(data) {
            var shows = data.resultsPage.results.event;

            function formatShowObj(event, i) {
                return {
                    artist: shows[i].performance[0].artist.displayName,
                    venue: shows[i].venue.displayName,
                    date: shows[i].start.date,
                    time: shows[i].start.time,
                    songkick: shows[i].performance[0].artist.uri
                }
            }

            var show = formatShowObj(event, eventIndex);

            // console.log(show.artist);

            $('.x').click(function(evt) {
                dislikeShow(); // removes current show from array
                var show = formatShowObj(event, eventIndex);
                displayShow(show); // displays next show in array
            });

            $('.heart').click(function(evt) {
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
                $('.modal').html('<h2 class="modalText"><div class="artist">' + show.artist + '</div><div class="venue"> at ' + show.venue + '</div> was added to your itinerary </h2><a href="#" class="ok">Awesome!</a>');
                var date = show.date;
                if (date) {
                    date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                        return m + '/' + d + '/' + y;
                    });
                }

                $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
                $('.show').append('<h3 class="where"> at ' + show.venue + '</h3>');
                var time = show.time;
                if (time === null) {
                    $('.show').append('<h4 class="when">' + date + ' at TBA </h4>');
                }
                if (time) {
                    var newTime = time.split(':');
                    var hours = Number(newTime[0]);
                    var minutes = Number(newTime[1]);
                    var timeValue = "" + ((hours > 12) ? hours - 12 : hours); // get hours
                    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
                    timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
                    $('.show').append('<h4 class="when">' + date + ' at ' + timeValue + '</h4>');
                }
                if (time === null) {
                    $('.itineraryList').append('<li class="showArtist">' + show.artist + '</li>' + '<li class="listItem"> at ' + show.venue + '</li>' + '<li class="listItem">' + date + '</li>' + '<li class="listItem"> TBA </li>');
                }
                if (time) {
                    $('.itineraryList').append('<li class="showArtist">' + show.artist + '</li>' + '<li class="listItem"> at ' + show.venue + '</li>' + '<li class="listItem">' + date + '</li>' + '<li class="listItem">' + timeValue + '</li>');
                }
                eventIndex++;
            }

            function displayShow(show) {
                // console.log(show);

                var date = show.date;
                if (date) {
                    date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                        return m + '/' + d + '/' + y;
                    });
                }

                $('.show').html('<a class="who link" href="' + show.songkick + '<h2 class="who link">' + show.artist + '</h2></a>');
                $('.show').append('<h3 class="where"> at ' + show.venue + '</h3>');
                var time = show.time;
                if (time === null) {
                    $('.show').append('<h4 class="when">' + date + ' at TBA </h4>');
                }
                if (time) {
                    var newTime = time.split(':');
                    var hours = Number(newTime[0]);
                    var minutes = Number(newTime[1]);
                    var timeValue = "" + ((hours > 12) ? hours - 12 : hours); // get hours
                    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
                    timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
                    $('.show').append('<h4 class="when">' + date + ' at ' + timeValue + '</h4>');
                }
            }
        })
        .always(function(data) {

        })
        .fail(function(err) {
            if (err) throw err;
        })

        $('.itinerary').click(function () {
            window.location.replace("localhost:3000/itinerary");
        })
});
