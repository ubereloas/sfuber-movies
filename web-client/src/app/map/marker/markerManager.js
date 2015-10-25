angular.module('sfuber-movies').service('markerManager', function ($rootScope, clusterCalculator) {
    var self = this;
    this.markers = [];
    this.activeMarker = null;
    this.clusterType = 'cluster';
    this.clusterOptions = {
        minimumClusterSize: 3,
        calculator: clusterCalculator
    };

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
        });

        self.clusterType = null;
    });

    $rootScope.$on('FILTER_REMOVED', function () {
        self.clusterType = 'cluster';
        self.markers = unfilteredMarkers;
    });
});