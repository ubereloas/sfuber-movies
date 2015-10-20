describe('markerFactory', function() {
    var factory;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function(markerFactory) {
        factory = markerFactory;
    }));

    it('creates markers with the latitude and longitude of the given movie locations', function() {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 1, longitude: 2 },
            movies: []
        });

        expect(marker.latitude).toEqual(1);
        expect(marker.longitude).toEqual(2);
    });

    it('creates markers with data for location name and movies filmed there', function() {
        var marker = factory.forMovieLocation({
            name: 'LocName',
            coordinates: { latitude: 1, longitude: 2 },
            movies: ['M1']
        });

        expect(marker.data.name).toEqual('LocName');
        expect(marker.data.movies).toEqual(['M1']);
    });

    it('creates markers with increasing ids starting at 0', function() {
        var firstMarker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movies: []
        });
        var secondMarker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movies: []
        });

        expect(firstMarker.id).toEqual(0);
        expect(secondMarker.id).toEqual(1);
    });

    it('creates markers containing the number of movies in their label if < 10', function () {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movies: ['M1', 'M2']
        });

        expect(marker.options.label).toEqual('2');
    });

    it('creates markers containing a + in their label if number of movies >=10', function () {
        var marker = factory.forMovieLocation({
            coordinates: { latitude: 0, longitude: 0 },
            movies: ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10']
        });

        expect(marker.options.label).toEqual('+');
    })
});