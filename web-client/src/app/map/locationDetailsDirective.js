angular.module('sfuber-movies').directive('locationDetails', function () {
    return {
        restrict: 'E',
        scope: {
            location: '='
        },
        template: [
            '<div class="location-details">',
            '  <div class="location-name">{{vm.details.name}}</div>',
            '  <div class="movie-list">',
            '    <div ng-repeat="movie in vm.details.movies">',
            '      {{movie.title}} <span class="movie-year">({{movie.year}})</span>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join(''),
        controllerAs: 'vm',
        bindToController: true,
        controller: function (locationDetailsRepository) {
            var vm = this;

            locationDetailsRepository.forLocation(vm.location).then(function(details) {
                vm.details = details;
            })
        }
    }
});
