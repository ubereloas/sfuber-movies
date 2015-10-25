angular.module('sfuber-movies').factory('clusterCalculator', function () {
    function calculateUniqueMoviesAcrosssMarkers(markers) {
        var uniqueMovieIds = _.reduce(markers, function(acc, location) {
            var ids = _.pluck(location.data.movie_ids, '$oid');
            return _.union(acc, ids);
        }, 0);
        return uniqueMovieIds.length;
    }

    function getIndexForMovieCount(movieCount) {
        if (movieCount >= 150) {
            return 4;
        } else if (movieCount >= 100) {
            return 3;
        } else if (movieCount >= 50) {
            return 2;
        } else {
            return 1;
        }
    }

    return function(elements) {
        var uniqueMoviesInLocation = calculateUniqueMoviesAcrosssMarkers(elements.values());

        return {
            index: getIndexForMovieCount(uniqueMoviesInLocation),
            text: uniqueMoviesInLocation
        }
    }
});