(function() {
    'use strict';

    var thread = angular.module('opentele.controllers.thread', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices'
    ]);

    thread.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/thread', {
                title: 'MESSAGES_TITLE',
                templateUrl: 'areas/messages/thread.html'
            });
        }]);

    thread.controller('ThreadCtrl', function($scope, $window, $location,
                                             headerService, appContext, messageThreads) {

        $scope.$on('backClick', function() {
            $window.history.back();
        });

        $scope.newMessage = function() {
            appContext.requestParams.set('selectedThread', $scope.model.thread);
            $location.path('/newMessage');
        };

        $scope.delimiter = function(message) {
            return message.title ? ' - ' : '';
        };

        var goToBottom = function() {
            $window.scrollTo(0,document.body.scrollHeight);
        };

        headerService.setBack(true);
        if (!appContext.requestParams.containsKey('selectedThread')) {
            $location.path('/menu');
            return;
        }

        var selectThreadRef = appContext.requestParams.getAndClear('selectedThread');

        $scope.model = {};
        $scope.model.thread = selectThreadRef;
        messageThreads.get(selectThreadRef, function(currentThread) {

            // on success
            var messages = currentThread.messages;
            messages.sort(function(m1, m2) {
                return m1.id - m2.id; // order by ID -> order by creation date.
            });

            var unmarkedMessages = messages.filter(function(message) {
                return message.from.type === "Department";
            });

            $scope.model.messages = messages;

            messageThreads.markAsRead(selectThreadRef, unmarkedMessages,
                function() {
                    for (var i = 0; i < messages.length; i++) {
                        var message = messages[i];
                        for (var j = 0; j < unmarkedMessages.length; j++) {
                            var unmarkedMessage = unmarkedMessages[j];
                            if (message.id === unmarkedMessage.id) {
                                message.isRead = true;
                            }
                        }
                    }
                    $scope.model.messages = messages;
                    goToBottom();
                },
                function() {
                    $scope.model.messages = messages;
                    goToBottom();
                }
            );

        });

    });
}());
