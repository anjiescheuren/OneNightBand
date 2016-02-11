$(function() {
    var apiRoot = 'http://api.songkick.com/api/3.0/events.json?location=geo:30.2669444,-97.7427778&per_page=100&min_date=2016-03-15&max_date=2016-03-20&apikey=PTAZie3wbuF6n5dx';

    //show one arist, venue, date and time on the page to begin with
    function displayShow(shows) {
        var event = shows.resultsPage.results.event[0];
        var artist = event.performance[0].artist.displayName;
        var venue = event.venue.displayName;
        var date = event.start.date;
        var time = event.start.time;
        var songkick = event.performance[0].artist.uri;

        if (date) {
            date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                return m + '/' + d + '/' + y;
            });
        }

        $('.show').html('<a class="who link" href="' + songkick + '<h2 class="who link">' + artist + '</h2></a>');
        $('.show').append('<h3 class="where"> at ' + venue + '</h3>');
        if (time === null) {
            $('.show').append('<h4 class="when">' + date + ' at TBA </h4>');
        }
        if (time) {
            var newTime = event.start.time.split(':');
            var hours = Number(newTime[0]);
            var minutes = Number(newTime[1]);
            var timeValue = "" + ((hours > 12) ? hours - 12 : hours); // get hours
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
            $('.show').append('<h4>' + date + ' at ' + timeValue + '</h4>');
        }

    }

    var displayShows = function(shows) {
        var performance = shows.resultsPage.results.event;
        if (!shows) {
            return;
        }
        var event = performance;
        event.forEach(function(i) {
            var event = i;
            var performance = event.performance;
            for (var i = 1; i < performance.length; i++) {
                var show = performance[i];
            }
            performance.forEach(function(j) {
                var performance = j;
                var artist = performance.artist.displayName;
                var venue = event.venue.displayName;
                var date = event.start.date;
                var time = event.start.time;
                var songkick = performance.artist.uri;

                if (date) {
                    date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                        return m + '/' + d + '/' + y;
                    });
                }

                $('.show').html('<a class="who link" href="' + songkick + '<h2 class="who link">' + artist + '</h2></a>');
                $('.show').append('<h3> at ' + venue + '</h3>');
                if (time === null) {
                    $('.show').append('<h4>' + date + ' at TBA </h4>');

                }
                if (time) {
                    var newTime = event.start.time.split(':');
                    var hours = Number(newTime[0]);
                    var minutes = Number(newTime[1]);
                    var timeValue = "" + ((hours > 12) ? hours - 12 : hours); // get hours
                    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
                    timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
                    $('.show').append('<h4>' + date + ' at ' + timeValue + '</h4>');
                }

            })
        });
    }

    $.ajax({
            url: apiRoot,
            method: "GET",
            data: {},
            dataType: "json"
        })
        .done(function(data) {
            var shows = data;
            displayShow(shows);
            var i = 1;
            //on click of x move to the next event
            $('.x').on('click', function() {
                if (i <= 99) {
                    var index = i++;
                } else
                    return;
                var event = shows.resultsPage.results.event[index];
                var artist = event.performance[0].artist.displayName;
                var venue = event.venue.displayName;
                var date = event.start.date;
                var time = event.start.time;
                var songkick = event.performance[0].artist.uri;
                event = shows.resultsPage.results.event[i];
                if (date) {
                    date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                        return m + '/' + d + '/' + y;
                    });
                }

                $('.show').html('<a class="who link" href="' + songkick + '<h2 class="who link">' + artist + '</h2></a>');
                $('.show').append('<h3 class="where"> at ' + venue + '</h3>');
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

            })

            //on click of x move to the next event
            $('.heart').on('click', function() {


                if (i <= 99) {
                    var index = i++;
                } else
                    return;
                var event = shows.resultsPage.results.event[index];
                var artist = event.performance[0].artist.displayName;
                var venue = event.venue.displayName;
                var date = event.start.date;
                var time = event.start.time;
                var songkick = event.performance[0].artist.uri;
                event = shows.resultsPage.results.event[i];
                if (date) {
                    date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match, y, m, d) {
                        return m + '/' + d + '/' + y;
                    });
                }

                $('.show').html('<a class="who link" href="' + songkick + '<h2 class="who link">' + artist + '</h2></a>');
                $('.show').append('<h3 class="where"> at ' + venue + '</h3>');
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

            })
        })
        .always(function(data) {

        })
        .fail(function(err) {
            if (err) throw err;
        })
});
