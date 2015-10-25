describe('markerFactory', function() {
    var factory;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function(markerFactory) {
        factory = markerFactory;
    }));

    it('creates markers with the latitude and longitude of the given movie locations', function() {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_ids: [{$oid: 'SomeId'}]
        });

        expect(marker.latitude).toEqual(2);
        expect(marker.longitude).toEqual(3);
    });

    it('creates markers with data containing the id of the location and id of movies filmed there', function() {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_ids: [{$oid: 'SomeId'}]
        });

        expect(marker.data._id).toEqual({$oid: 1 });
        expect(marker.data.movie_ids).toEqual([{$oid: 'SomeId'}]);
    });

    it('creates markers with increasing ids starting at 0', function() {
        var firstMarker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 1, longitude: 1 },
            movie_ids: [{$oid: 'SomeId1'}]
        });
        var secondMarker = factory.forMovieLocation({
            _id: { $oid: 2 },
            coordinates: { latitude: 2, longitude: 2 },
            movie_ids: [{$oid: 'SomeId2'}]
        });

        expect(firstMarker.id).toEqual(0);
        expect(secondMarker.id).toEqual(1);
    });

    it('creates markers containing the number of movies in their label if < 10', function () {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_ids: [{$oid: 'SomeId1'}, {$oid: 'SomeId2'}]
        });

        expect(marker.options.label).toEqual('2');
    });

    it('creates markers containing a + in their label if number of movies >=10', function () {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_ids: [
                {$oid: 'SomeId1'},{$oid: 'SomeId2'},{$oid: 'SomeId3'},{$oid: 'SomeId4'},{$oid: 'SomeId5'},{$oid: 'SomeId6'},
                {$oid: 'SomeId7'},{$oid: 'SomeId8'},{$oid: 'SomeId9'},{$oid: 'SomeId1'}
            ]
        });

        expect(marker.options.label).toEqual('+');
    })
});