(function () {
    'use strict';

    var remindersService = angular.module('opentele.restApiServices.reminders', [
        'ngResource',
        'opentele.stateServices'
    ]);

    remindersService.service('reminders', function ($http, nativeService) {

        var update = function(user) {
            listFor(user, nativeService.sendReminders);
        };

        var listFor = function (user, onSuccess) {

            var wrapSuccess = function (onSuccess) {
                return function (responseData) {
                    onSuccess(responseData);
                };
            };

            if (!user.hasOwnProperty('links') ||
                !user.links.hasOwnProperty('reminders')) {
                throw new TypeError('User object does not contain a link ' +
                    'relation to reminders');
            }

            $http.get(user.links.reminders)
                .success(wrapSuccess(onSuccess));
        };

        return {
            update: update
        };

    });
}());
