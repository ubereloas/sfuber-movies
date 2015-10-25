angular.module('sfuber-movies').directive('filterControl', function () {
    return {
        restrict: 'E',
        templateUrl: 'map/filter/filterControl.tpl.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function ($rootScope, $q, movieRepository) {
            var vm = this;
            vm.searchMovies = function (userInputString) {
                var deferred = $q.defer();
                movieRepository.getAllWithTitleContaining(userInputString).then(function(movies) {
                    deferred.resolve({
                        data: movies // angucomplete expects objects to be under root property 'data'
                    })
                });
                return deferred.promise;
            };

            var lastBroadcast = null;
            vm.selected = function (obj) {
                if (obj) {
                    $rootScope.$emit('FILTER_ADDED', obj.originalObject);
                    lastBroadcast = 'FILTER_ADDED';
                } else if (lastBroadcast != 'FILTER_REMOVED') {
                    $rootScope.$emit('FILTER_REMOVED');
                    lastBroadcast = 'FILTER_REMOVED';
                }
            };
        }
    }
});