var angular = require('angular');

angular.module('sfuber-movies', [])
    .service('AwesomeMessageService', function ($http, $q) {
        var serviceUrl = 'http://localhost:5000';

        this.getMsg = function () {
            var deferred = $q.defer();
            $http.get(serviceUrl + '/awesome-message').then(function (resp) {
                deferred.resolve(resp.data.message);
            });
            return deferred.promise;
        }
    })
    .directive('awesomeMessage', function () {
        return {
            restrict: 'E',
            template: '{{vm.msg}}',
            controllerAs: 'vm',
            controller: function (AwesomeMessageService) {
                var vm = this;
                AwesomeMessageService.getMsg().then(function (msg) {
                    vm.msg = msg;
                });
            }
        }
    });