describe('markerFactory', function() {
    var factory;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function(markerFactory) {
        factory = markerFactory;
    }));

    it('creates markers with the latitude and longitude of the given movie locations', function() {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 1, longitude: 2 },
            movie_count: 1
        });

        expect(marker.latitude).toEqual(1);
        expect(marker.longitude).toEqual(2);
    });

    it('creates markers with increasing ids starting at 0', function() {
        var firstMarker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movie_count: 1
        });
        var secondMarker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movie_count: 1
        });

        expect(firstMarker.id).toEqual(0);
        expect(secondMarker.id).toEqual(1);
    });

    it('creates markers containing the number of movies in their label if < 10', function () {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movie_count: 2
        });

        expect(marker.options.label).toEqual('2');
    });

    it('creates markers containing a + in their label if number of movies >=10', function () {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movie_count: 11
        });

        expect(marker.options.label).toEqual('+');
    })
});