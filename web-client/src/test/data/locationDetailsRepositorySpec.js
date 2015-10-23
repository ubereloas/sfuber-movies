describe('locationDetailsRepositorySpec', function () {
    var repo;
    var $httpBackend, $rootScope;

    beforeEach(angular.mock.module('sfuber-movies'));
    beforeEach(angular.mock.inject(function (locationDetailsRepository, _$httpBackend_, _$rootScope_) {
        repo = locationDetailsRepository;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('#forLocation', function () {
        it('retrieves the location details for the specified location from the service and returns it in a promise', function () {
            $httpBackend.expectGET('http://localhost:5000/movie-locations/2/details').respond({
                location_details: {
                    name: 'LocName',
                    movies: ['Movie1']
                }
            });

            var handler = jasmine.createSpy('onSuccess');
            repo.forLocation({_id: {$oid: 2}}).then(handler);
            $httpBackend.flush();

            expect(handler).toHaveBeenCalledWith({
                name: 'LocName',
                movies: ['Movie1']
            });
        });
    });
});