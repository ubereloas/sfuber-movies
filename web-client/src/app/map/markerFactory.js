angular.module('sfuber-movies').service('markerFactory', function () {
    var nextId = 0;

    this.forMovieLocation = function (location) {
        return {
            id: nextId++,
            options: {label: makeLabel(location)},
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude,
            data: {
                name: location.name,
                movies: location.movies
            }
        }
    };

    function makeLabel(location) {
        return location.movies.length >= 10 ? '+' : location.movies.length.toString();
    }
});