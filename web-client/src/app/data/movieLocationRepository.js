angular.module('sfuber-movies').service('movieLocationRepository', function ($http, $q) {
    var endpoint = 'http://localhost:5000/movie-locations';

    this.getAll = function () {
        var deferred = $q.defer();
        $http.get(endpoint).then(function (resp) {
            deferred.resolve(resp.data.movie_locations);
        });
        return deferred.promise;
    }
});