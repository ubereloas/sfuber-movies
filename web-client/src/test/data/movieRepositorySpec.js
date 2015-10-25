describe('movieRepository', function () {
    var repo;
    var $httpBackend, $rootScope;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function (movieRepository, _$httpBackend_, _$rootScope_) {
        repo = movieRepository;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('#getAllWithTitleContaining', function () {
        it('retrieves a list of movies matching the given title from the service and returns them in a promise', function () {
            $httpBackend.expectGET('http://localhost:5000/movies?titleFilter=some+keyword').respond({movies: [{
                title: 'MovieTitle',
                year: 'MovieYear'
            }]});

            var handler = jasmine.createSpy('onSuccess');
            repo.getAllWithTitleContaining('some keyword').then(handler);
            $httpBackend.flush();

            expect(handler).toHaveBeenCalledWith([{
                title: 'MovieTitle',
                year: 'MovieYear'
            }]);
        });
    });
});