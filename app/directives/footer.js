(function() {
    'use strict';

    var footerDirective = angular.module('opentele.directives.footer', []);

    footerDirective.directive('version', function (appConfig) {
        return function(scope, element) {
            element.text(appConfig.version);
        };
    });

    footerDirective.directive('server', function(restConfig) {
        return function(scope, element) {
            element.text(restConfig.baseUrl);
        };
    });

}());
