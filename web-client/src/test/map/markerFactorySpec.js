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
            movie_count: 1
        });

        expect(marker.latitude).toEqual(2);
        expect(marker.longitude).toEqual(3);
    });

    it('creates markers with data containing the id of the location and number of movies filmed there', function() {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_count: 1
        });

        expect(marker.data._id).toEqual({$oid: 1 });
        expect(marker.data.movie_count).toEqual(1);
    });

    it('creates markers with increasing ids starting at 0', function() {
        var firstMarker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 1, longitude: 1 },
            movie_count: 1
        });
        var secondMarker = factory.forMovieLocation({
            _id: { $oid: 2 },
            coordinates: { latitude: 2, longitude: 2 },
            movie_count: 2
        });

        expect(firstMarker.id).toEqual(0);
        expect(secondMarker.id).toEqual(1);
    });

    it('creates markers containing the number of movies in their label if < 10', function () {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_count: 2
        });

        expect(marker.options.label).toEqual('2');
    });

    it('creates markers containing a + in their label if number of movies >=10', function () {
        var marker = factory.forMovieLocation({
            _id: { $oid: 1 },
            coordinates: { latitude: 2, longitude: 3 },
            movie_count: 10
        });

        expect(marker.options.label).toEqual('+');
    })
});