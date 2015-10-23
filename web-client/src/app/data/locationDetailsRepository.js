angular.module('sfuber-movies').service('locationDetailsRepository', function ($http, $q) {
    this.forLocation = function (location) {
        var endpoint = 'http://localhost:5000/movie-locations/' + location._id.$oid + '/details';

        var deferred = $q.defer();
        $http.get(endpoint).then(function (resp) {
            deferred.resolve(resp.data.location_details);
        });
        return deferred.promise;
    }
});