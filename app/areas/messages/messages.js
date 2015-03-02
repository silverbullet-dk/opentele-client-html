(function() {
    'use strict';

    var messages = angular.module('opentele.controllers.messages', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices'
    ]);

    messages.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/messages', {
                title: 'MESSAGES_TITLE',
                templateUrl: 'areas/messages/messages.html'
            });
        }]);

    messages.controller('MessagesCtrl', function($scope, $location, headerService,
                                                 appContext, messageThreads) {

        $scope.showThread = function(selected) {
            var threadRef = $scope.model.threads[selected];
            appContext.requestParams.set('selectedThread', threadRef);
            $location.path('/thread');
        };

        headerService.setBack(false);
        $scope.model = {};
        var user = appContext.currentUser.get();

        messageThreads.listFor(user, function(data) {
            $scope.model = data;
            if (data.threads.length === 1) {
                $location.replace('/messages', '/menu');
                $scope.showThread(0);
            }
        });

    });
}());
