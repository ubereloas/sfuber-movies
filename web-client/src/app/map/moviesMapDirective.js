angular.module('sfuber-movies').directive('moviesMap', function () {
    return {
        restrict: 'E',
        template: [
            '<ui-gmap-google-map center="vm.map.center" zoom="vm.map.zoom">',
            '  <ui-gmap-markers click="vm.activateMarker" models="vm.markers" coords="\'self\'" options="\'self\'">',
            '  </ui-gmap-markers>',
            '  <ui-gmap-window coords="vm.activeMarker" show="vm.activeMarker != null"',
            '                  closeClick="vm.deactivateMarker" options="vm.activeMarkerWindowOptions"',
            '                  templateUrl="\'/map/locationDetailsWindow.html\'" templateParameter="vm.activeMarker.data">',
            '  </ui-gmap-window>',
            '</ui-gmap-google-map>'
        ].join(''),
        controllerAs: 'vm',
        controller: function (movieLocationRepository, markerFactory) {
            var vm = this;
            vm.map = {
                center: {latitude: 37.7, longitude: -122.45}, // Fog City
                zoom: 12
            };
            vm.markers = [];
            vm.activeMarker = null;
            vm.activeMarkerWindowPos = null;
            vm.activeMarkerWindowOptions = { pixelOffset: {height: -38, width: 0 }};

            vm.activateMarker = function(gMarker, event, marker) {
                vm.activeMarker = marker;
                vm.activeMarkerWindowPos = {
                    latitude: marker.latitude + 0.01,
                    longitude: marker.longitude
                };
            };
            vm.deactivateMarker = function() {
                vm.activeMarker = null;
            };

            movieLocationRepository.getAll().then(onMovieLocationsReceived);

            function onMovieLocationsReceived(locations) {
                for (var i = 0; i < locations.length; i++) {
                    vm.markers.push(markerFactory.forMovieLocation(locations[i]));
                }
            }
        }
    }
});
