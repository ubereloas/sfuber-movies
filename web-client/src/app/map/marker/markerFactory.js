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
                movie_ids: location.movie_ids
            }
        }
    };

    function makeLabel(location) {
        return location.movie_ids.length >= 10 ? '+' : location.movie_ids.length.toString();
    }
});