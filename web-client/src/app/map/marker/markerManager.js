angular.module('sfuber-movies').service('markerManager', function ($rootScope) {
    var self = this;
    this.markers = [];
    this.activeMarker = null;

    this.activateMarker = function (marker) {
        this.activeMarker = marker;
    };
    this.deactivateMarker = function () {
        this.activeMarker = null;
    };

    var unfilteredMarkers;
    $rootScope.$on('FILTER_ADDED', function (event, movie) {
        unfilteredMarkers = _.clone(self.markers);

        _.forEach(unfilteredMarkers, function (marker) {
            if (!_.some(marker.data.movie_ids, movie._id)) {
                _.remove(self.markers, marker);
            }
        })
    });

    $rootScope.$on('FILTER_REMOVED', function () {
        self.markers = unfilteredMarkers;
    });
});