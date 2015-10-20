angular.module('sfuber-movies').service('markerFactory', function () {
    var nextId = 0;

    this.forMovieLocation = function (location) {
        return {
            id: nextId++,
            options: {label: makeLabel(location)},
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude
        }
    };

    function makeLabel(location) {
        return location.movie_count >= 10 ? '+' : location.movie_count.toString();
    }
});