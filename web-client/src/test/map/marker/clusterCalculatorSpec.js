describe('clusterCalculator', function () {
    var calculator;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function (clusterCalculator) {
        calculator = clusterCalculator;
    }));

    it('calculates the number of unique movies based on their ids across the given markers', function () {
        var res = calculator({
            values: function () {
                return [
                    {data: {movie_ids: [{$oid: 'Id1'}, {$oid: 'Id2'}]}},
                    {data: {movie_ids: [{$oid: 'Id2'}]}},
                    {data: {movie_ids: [{$oid: 'Id1'}]}},
                    {data: {movie_ids: [{$oid: 'Id3'}]}}
                ]
            }
        });

        expect(res).toEqual(jasmine.objectContaining({
            text: 3
        }));
    });

    it('returns index 1 across markers with less than 50 movies', function () {
        var res1 = calculator(makeLocationsWithMovieCount(1));
        expect(res1).toEqual(jasmine.objectContaining({
            index: 1
        }));

        var res2 = calculator(makeLocationsWithMovieCount(49));
        expect(res2).toEqual(jasmine.objectContaining({
            index: 1
        }));
    });

    it('returns index 2 across markers with less than or equal to 100 movies but more than or equal to 50', function () {
        var res1 = calculator(makeLocationsWithMovieCount(50));
        expect(res1).toEqual(jasmine.objectContaining({
            index: 2
        }));

        var res2 = calculator(makeLocationsWithMovieCount(99));
        expect(res2).toEqual(jasmine.objectContaining({
            index: 2
        }));
    });

    it('returns index 3 across markers with less 150 movies but more than or equal to 100', function () {
        var res1 = calculator(makeLocationsWithMovieCount(100));
        expect(res1).toEqual(jasmine.objectContaining({
            index: 3
        }));

        var res2 = calculator(makeLocationsWithMovieCount(149));
        expect(res2).toEqual(jasmine.objectContaining({
            index: 3
        }));
    });

    it('returns index 4 across markers with more than 150 movies', function () {
        var res1 = calculator(makeLocationsWithMovieCount(151));
        expect(res1).toEqual(jasmine.objectContaining({
            index: 4
        }));
    });

    function makeLocationsWithMovieCount(count) {
        var locations = [];
        _.times(count, function (n) {
            locations.push({
                data: {movie_ids: [{$oid: n.toString()}]}
            })
        });
        return {
            values: function () {
                return locations;
            }
        }
    }
});