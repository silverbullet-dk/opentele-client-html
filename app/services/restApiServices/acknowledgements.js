(function () {
    'use strict';

    var acknowledgementsService = angular.module('opentele.restApiServices.acknowledgements', [
        'ngResource'
    ]);

    acknowledgementsService.service('acknowledgements', function ($http) {

        var listFor = function (user, onSuccess) {

            var wrapSuccess = function (onSuccess) {
                return function (responseData) {
                    onSuccess(responseData);
                };
            };

            if (!user.hasOwnProperty('links') ||
                !user.links.hasOwnProperty('acknowledgements')) {
                throw new TypeError('User object does not contain a link ' +
                    'relation to acknowledgements');
            }

            $http.get(user.links.acknowledgements)
                .success(wrapSuccess(onSuccess));
        };

        return {
            listFor: listFor
        };

    });
}());
