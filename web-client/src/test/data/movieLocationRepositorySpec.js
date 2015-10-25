describe('movieLocationRepository', function () {
    var repo;
    var $httpBackend, $rootScope;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function (movieLocationRepository, _$httpBackend_, _$rootScope_) {
        repo = movieLocationRepository;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('#getAll', function () {
        it('retrieves a list of movie locations from the service and returns them in a promise', function () {
            $httpBackend.expectGET('http://localhost:5000/movie-locations').respond({movie_locations: [{
                coordinates: {latitude: 1, longitude: 2},
                movie_count: 3
            }]});

            var handler = jasmine.createSpy('onSuccess');
            repo.getAll().then(handler);
            $httpBackend.flush();

            expect(handler).toHaveBeenCalledWith([{
                coordinates: {latitude: 1, longitude: 2},
                movie_count: 3
            }]);
        });
    });
});