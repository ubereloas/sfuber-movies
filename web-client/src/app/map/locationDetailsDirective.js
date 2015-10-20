angular.module('sfuber-movies').directive('locationDetails', function () {
    return {
        restrict: 'E',
        scope: {
            details: '='
        },
        template: [
            '<div class="location-details">',
            '  <div class="name">{{vm.details.name}}</div>',
            '  <div class="movie-list">',
            '    <div ng-repeat="movie in vm.details.movies">{{movie}}</div>',
            '  </div>',
            '</div>'
        ].join(''),
        controllerAs: 'vm',
        bindToController: true,
        controller: function () {
        }
    }
});
