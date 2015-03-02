(function() {
    'use strict';



    var chart = angular.module('opentele.directives.chart', [
    ]);

    chart.directive('chart', function() { // original source: https://github.com/angular-ui/ui-chart
        return {
            restrict: 'EACM',
            template: '<div></div>',
            replace: true,
            link: function (scope, element, attributes) {

                var renderChart = function() {

                    var data = scope.$eval(attributes.chart);
                    element.html('');
                    if (!angular.isArray(data)) {
                        return;
                    }

                    var opts = {};
                    if (!angular.isUndefined(attributes.chartOptions)) {
                        opts = scope.$eval(attributes.chartOptions);
                        if (!angular.isObject(opts)) {
                            throw 'Invalid chart options attribute';
                        }
                    }

                    element.jqplot(data, opts);
                };

                scope.$watch(attributes.chart, function () {
                    renderChart();
                }, true);

                scope.$watch(attributes.chartOptions, function () {
                    renderChart();
                });
            }
        };
    });

    chart.directive('measurement', function() {

        return {
            restrict: 'EACM',
            template: '<div></div>',
            replace: true,
            link: function(scope, element, attributes) {

                var renderMeasurement = function() {

                    var colorMeasurement = function(element, measurement) {
                        // todo: defining colors inside javascript not ideal.
                        var color = '#333333';
                        if (measurement.isBeforeMeal && !measurement.isAfterMeal) {
                            color = '#4076E7';
                        }
                        if (!measurement.isBeforeMeal && measurement.isAfterMeal) {
                            color = '#E73F38';
                        }
                        element.attr('style', 'color: ' + color);
                    };

                    var data = scope.$eval(attributes.measurement);
                    element.html('');
                    if (!angular.isObject(data)) {
                        return;
                    }

                    var measurement = data.measurement;
                    colorMeasurement(element, measurement);
                    element.html(measurement.value);
                };

                scope.$watch(attributes.measurement, function() {
                    renderMeasurement();
                }, true);

            }
        };
    });

}());