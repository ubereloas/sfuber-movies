angular.module('sfuber-movies').service('movieRepository', function ($http, $q) {
    var endpoint = 'http://localhost:5000/movies';

    this.getAllWithTitleContaining = function (filter) {
        var deferred = $q.defer();
        $http({
            url: endpoint,
            method: 'GET',
            params: {titleFilter: filter}
        }).then(function (resp) {
            deferred.resolve(resp.data.movies);
        });
        return deferred.promise;
    }
});