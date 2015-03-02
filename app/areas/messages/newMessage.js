(function() {
    'use strict';

    var thread = angular.module('opentele.controllers.newMessage', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.translations'
    ]);

    thread.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/newMessage', {
                title: 'MESSAGES_TITLE',
                templateUrl: 'areas/messages/newMessage.html'
            });
        }]);

    thread.controller('NewMessageCtrl', function($scope, $window, $location, $http, $translate,
                                                 headerService, appContext, messageThreads) {

        $scope.$on('backClick', function() {
            appContext.requestParams.set('selectedThread', $scope.model.thread);
            $window.history.back();
        });

        $scope.submit = function() {
            var message = {
                "department": $scope.model.thread.id,
                "title": "",
                "text": $scope.model.message
            };

            messageThreads.post($scope.model.thread, message,
                function() {
                    // upload succeed
                    appContext.requestParams.set('selectedThread', $scope.model.thread);
                    $location.path('/thread');
                },
                function() {
                    // upload failed
                    $scope.model.errorMessage = $translate.instant('MESSAGES_ERROR_COULD_NOT_SEND');
                }
            );
        };

        $scope.model = {};
        if (!appContext.requestParams.containsKey('selectedThread')) {
            $location.path('/menu');
            return;
        }
        $scope.model.thread = appContext.requestParams.getAndClear('selectedThread');

    });

}());
