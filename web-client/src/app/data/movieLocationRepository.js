angular.module('sfuber-movies').service('movieLocationsRepository', function ($http, $q) {
    var endpoint = 'http://localhost:5000/movie-locations';

    this.getAll = function () {
        var deferred = $q.defer();

        $http.get(endpoint).then(function (resp) {
            deferred.resolve(resp.data.data);
        });

        return deferred.promise;
    }
});