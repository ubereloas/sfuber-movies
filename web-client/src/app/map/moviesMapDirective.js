angular.module('sfuber-movies').directive('moviesMap', function () {
    return {
        restrict: 'E',
        template: [
            '<ui-gmap-google-map center="vm.map.center" zoom="vm.map.zoom">',
            '  <ui-gmap-markers models="vm.markers" coords="\'self\'" options="\'self\'"></ui-gmap-markers>',
            '</ui-gmap-marker>',
            '</ui-gmap-google-map>'
        ].join(''),
        controllerAs: 'vm',
        controller: function (movieLocationsRepository, markerFactory) {
            var vm = this;
            vm.map = {
                center: {latitude: 37.7, longitude: -122.45}, // Fog City
                zoom: 12
            };
            vm.markers = [];

            movieLocationsRepository.getAll().then(onMovieLocationsReceived);
            function onMovieLocationsReceived(locations) {
                for (var i = 0; i < locations.length; i++) {
                    vm.markers.push(markerFactory.forMovieLocation(locations[i]));
                }
            }
        }
    }
});
