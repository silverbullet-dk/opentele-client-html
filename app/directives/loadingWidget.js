(function() {
    'use strict';

    var loadingWidget = angular.module('opentele.directives.loadingWidget', [
        'opentele.restApiServices'
    ]);

    loadingWidget.directive('loadingWidget', function(httpNotifications) {
        return {
            restrict: "AC",
            link: function(scope, element) {
                element.hide();

                httpNotifications.subscribeOnRequestStarted(function() {
                    element.show();
                });

                httpNotifications.subscribeOnRequestEnded(function() {
                    // hide the spinner only if there are no more pending requests
                    if (httpNotifications.getRequestCount() === 0) element.hide();
                });
            }
        };
    });

}());
