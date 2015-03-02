(function () {
    'use strict';

    var measurementsService = angular.module('opentele.restApiServices.measurements', [
        'ngResource'
    ]);

    measurementsService.service('measurements', function ($http) {

        var wrapSuccess = function (onSuccess) {
            return function (responseData) {
                if (typeof(responseData) === 'undefined' || responseData === null) {
                    onSuccess({});
                    return;
                }
                delete responseData.links;
                onSuccess(responseData);
            };
        };

        var listFor = function (user, onSuccess) {
            if (!user.hasOwnProperty('links') || !user.links.hasOwnProperty('measurements')) {
                throw new TypeError('User object does not contain a link relation to my measurements');
            }
            $http.get(user.links.measurements).success(onSuccess);
        };

        var get = function (measurementRef, filter, onSuccess) {

            if (!measurementRef.hasOwnProperty('links') ||
                !measurementRef.links.hasOwnProperty('measurement')) {
                throw new TypeError('Measurement ref does not contain a link relation to measurement');
            }

            var url = measurementRef.links.measurement;
            if (filter !== undefined && filter !== null && filter.length > 0) {
                url += "?filter=" + filter;
            }

            $http.get(url)
                .success(wrapSuccess(onSuccess));
        };

        return {
            listFor: listFor,
            get: get
        };

    });
}());
