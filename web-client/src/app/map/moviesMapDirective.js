angular.module('sfuber-movies').directive('moviesMap', function () {
    return {
        restrict: 'E',
        template: [
            '<ui-gmap-google-map center="vm.map.center" zoom="vm.map.zoom">',
            '  <ui-gmap-markers click="vm.activateMarker" models="vm.markerManager.markers" coords="\'self\'" options="\'self\'">',
            '  </ui-gmap-markers>',
            '  <ui-gmap-window coords="vm.markerManager.activeMarker" show="vm.markerManager.activeMarker != null"',
            '                  closeClick="vm.markerManager.deactivateMarker" options="vm.activeMarkerWindowOptions"',
            '                  templateUrl="\'/map/locationDetailsWindow.html\'" templateParameter="vm.markerManager.activeMarker.data">',
            '  </ui-gmap-window>',
            '  <ui-gmap-map-control template="filterControlTpl" position="TOP_LEFT"></ui-gmap-map-control>',
            '</ui-gmap-google-map>'
        ].join(''),
        controllerAs: 'vm',
        controller: function ($templateCache, $rootScope, markerManager, movieLocationRepository, markerFactory) {
            var vm = this;
            vm.markerManager = markerManager;
            vm.activeMarkerWindowOptions = { pixelOffset: {height: -38, width: 0 }};
            vm.map = {
                center: {latitude: 37.7, longitude: -122.45}, // Fog City
                zoom: 12
            };
            vm.activateMarker = function (gMarker, event, marker) {
                vm.markerManager.activateMarker(marker);
            };

            $templateCache.put('filterControlTpl', '<filter-control></filter-control>');
            movieLocationRepository.getAll().then(onMovieLocationsReceived);

            function onMovieLocationsReceived(locations) {
                for (var i = 0; i < locations.length; i++) {
                    markerManager.markers.push(markerFactory.forMovieLocation(locations[i]));
                }
            }
        }
    }
});
