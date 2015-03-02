(function() {
    'use strict';

    var errors = angular.module('opentele.controllers.errors', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.config',
        'opentele.exceptionHandler'
    ]);

    errors.config(function($routeProvider) {
        $routeProvider.when('/error', {
            title: 'ERROR_TITLE',
            templateUrl: 'areas/errors/errors.html',
            publicAccess: true
        });
    });

    errors.controller('ErrorsCtrl', function($scope, $location, headerService,
                                             appConfig, appContext,
                                             logReporting, errorCodes) {

        var determineErrorMessage = function(errorCode) {
            switch (errorCode) {
                case errorCodes.UNKNOWN_ERROR:
                    return 'OPENTELE_DOWN_TEXT';
                case errorCodes.INVALID_QUESTIONNAIRE:
                    return 'OPENTELE_INVALID_QUESTIONNAIRE';
                default:
                    return 'OPENTELE_DOWN_TEXT';
            }
        };

        $scope.leaveErrorPage = function() {
            $location.path('/menu');
        };

        headerService.setHeader(false);
        $scope.model = {};
        $scope.model.description = 'OPENTELE_DOWN_TEXT';
        $scope.model.okButtonText = 'OK';
        if (appContext.requestParams.containsKey('exception')) {
            var exception = appContext.requestParams.getAndClear('exception');
            $scope.model.description = determineErrorMessage(exception.code);
            if (appConfig.loggingEnabled) {
                logReporting.log(exception, function() {
                    console.log('Successfully logged exception.');
                }, function() {
                    console.log('Failed to log exception.');
                });
            }
        }

    });
}());
