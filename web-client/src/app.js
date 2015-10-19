angular.module('sfuber-movies', ['uiGmapgoogle-maps'])
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBCIgbAqGrq5cq5DTlQFTcJdL9DcKCGpoI',
            v: '3.21'
        });
    })
    .run(function (uiGmapIsReady) {
        // TODO: remove when done debugging
        uiGmapIsReady.promise(1).then(function (instances) {
            window.map = instances[0].map;
        })
    })
    .service('movieLocationsRepository', function ($http, $q) {
        var endpoint = 'http://localhost:5000/movie-locations';

        this.getAll = function () {
            var deferred = $q.defer();

            $http.get(endpoint).then(function (resp) {
                deferred.resolve(resp.data.data);
            });

            return deferred.promise;
        }
    })
    .directive('moviesMap', function () {
        return {
            restrict: 'E',
            template: [
                '<ui-gmap-google-map center="vm.map.center" zoom="vm.map.zoom">',
                '  <ui-gmap-markers models="vm.markers" coords="\'self\'" options="vm.markerOptions"></ui-gmap-markers>',
                '</ui-gmap-marker>',
                '</ui-gmap-google-map>'
            ].join(''),
            controllerAs: 'vm',
            controller: function (movieLocationsRepository) {
                var vm = this;
                vm.map = {
                    center: {latitude: 37.7, longitude: -122.45}, // Fog City
                    zoom: 12
                };
                vm.markers = [];
                vm.markerOptions = {
                    optimized: false
                };
                movieLocationsRepository.getAll().then(onMovieLocationsReceived);
                function onMovieLocationsReceived(locations) {
                    var nextId = 0;
                    for (var i = 0; i < locations.length; i++) {
                        vm.markers.push({
                            id: nextId++,
                            options: {optimized: true},
                            latitude: locations[i].coordinates.latitude,
                            longitude: locations[i].coordinates.longitude
                        });
                    }
                }
            }
        }
    });