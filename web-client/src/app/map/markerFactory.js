angular.module('sfuber-movies').service('markerFactory', function () {
    var nextId = 0;

    this.forMovieLocation = function (location) {
        return {
            id: nextId++,
            options: {label: makeLabel(location)},
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
            data: {
                _id: location._id,
                movie_count: location.movie_count
            }
        }
    };

    function makeLabel(location) {
        return location.movie_count >= 10 ? '+' : location.movie_count.toString();
    }
});