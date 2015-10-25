describe('markerManager', function () {
    var manager;
    var $rootScope;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function (_$rootScope_, markerManager) {
        $rootScope = _$rootScope_;
        manager = markerManager;
    }));

    describe('#activateMarker', function () {
        it('sets the active marker to the provided one when called', function () {
            manager.activateMarker({fake: 'marker'});

            expect(manager.activeMarker).toEqual({fake: 'marker'})
        });
    });

    describe('#deactivateMarker', function () {
        it('sets the active marker to null when called', function () {
            manager.deactivateMarker();

            expect(manager.activeMarker).toBe(null);
        });
    });

    it('has clustering activated by default', function () {
        expect(manager.clusterType).toEqual('cluster');
    });

    it('uses a minimum cluster size of 3', function () {
        expect(manager.clusterOptions.minimumClusterSize).toBe(3);
    });

    describe('when $rootScope event FILTER_ADDED is fired', function () {
        it('removes all markers not matching the filter', function () {
            manager.markers.push(
                {data: {movie_ids: [{$oid: 'MovieId1'}, {$oid: 'MovieId2'}]}},
                {data: {movie_ids: [{$oid: 'MovieId3'}, {$oid: 'MovieId4'}]}}
            );

            $rootScope.$emit('FILTER_ADDED', {_id: {$oid: 'MovieId3'}});

            expect(manager.markers).toEqual([{data: {movie_ids: [{$oid: 'MovieId3'}, {$oid: 'MovieId4'}]}}]);
        });

        it('deactivates clustering', function () {
            manager.markers.push(
                {data: {movie_ids: [{$oid: 'MovieId1'}]}}
            );

            manager.clusterType = 'cluster';
            $rootScope.$emit('FILTER_ADDED', {_id: {$oid: 'MovieId1'}});

            expect(manager.clusterType).toBeNull();
        });
    });

    describe('when $rootScope event FILTER_REMOVED is fired', function () {
        it('resets the markers to its previous value', function () {
            manager.markers.push(
                {data: {movie_ids: [{$oid: 'MovieId1'}]}},
                {data: {movie_ids: [{$oid: 'MovieId2'}]}}
            );

            $rootScope.$emit('FILTER_ADDED', {_id: {$oid: 'MovieId1'}});
            $rootScope.$emit('FILTER_REMOVED');

            expect(manager.markers).toEqual([
                {data: {movie_ids: [{$oid: 'MovieId1'}]}},
                {data: {movie_ids: [{$oid: 'MovieId2'}]}}
            ])
        });

        it('activates clustering', function () {
            manager.markers.push(
                {data: {movie_ids: [{$oid: 'MovieId1'}]}}
            );
            manager.clusterType = null;

            $rootScope.$emit('FILTER_REMOVED');

            expect(manager.clusterType).toEqual('cluster');
        });
    });
});