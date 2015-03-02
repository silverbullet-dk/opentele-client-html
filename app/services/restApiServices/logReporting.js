(function () {
    'use strict';

    var logReportingService = angular.module('opentele.restApiServices.logReporting', [
        'ngResource',
        'opentele.stateServices'
    ]);

    logReportingService.service('logReporting', function ($http, restConfig,
                                                          appConfig, nativeService) {

        var generateErrorMessage = function(exception) {

            return {
                //Insert desired log information here
            };
        };

        var log = function(exception, onSuccess, onError) {

            var postUrl = appConfig.loggingUrl;
            var config = {errorPassThrough: true};
            var errorMessage = generateErrorMessage(exception);

            var wrapResponse = function(response) {
                return function() {
                    if (response !== undefined && response !== null) {
                        response();
                    }
                };
            };

            $http.post(postUrl, errorMessage, config).
                success(wrapResponse(onSuccess)).
                error(wrapResponse(onError));

        };

        return {
            log: log
        };

    });

}());
