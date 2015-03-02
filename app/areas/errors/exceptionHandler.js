(function() {
    'use strict';

    var exceptionHandler = angular.module('opentele.exceptionHandler', []);

    exceptionHandler.constant('errorCodes', {
        UNKNOWN_ERROR: 0,
        INVALID_QUESTIONNAIRE: 1
    });

    exceptionHandler.config(function($provide) {

        Error.prototype.code = 0;

        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {

            return function(exception, cause) {
                var appContext = $injector.get('appContext');
                appContext.requestParams.set('exception', exception);

                $delegate(exception, cause);
                var location = $injector.get('$location');
                location.path('/error');
            };
        });
    });
}());
