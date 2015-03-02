(function() {
    'use strict';

    var bindDynamicHtml = angular.module('opentele.directives.bindDynamicHtml', [
    ]);

    bindDynamicHtml.directive('bindDynamicHtml', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {
                scope.$watch(attrs.bindDynamicHtml, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    });

}());
