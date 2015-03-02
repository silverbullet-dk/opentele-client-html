(function() {
    'use strict';

    var boundariesServices = angular.module('opentele.plotServices.generate.boundaries', [
        'opentele.plotServices',
        'opentele.plotServices.generate'
    ]);

    boundariesServices.service('boundaries', function (utils) {

        var y = function(measurements, type) {

            var min = 1000;
            var max = 0;

            var adjustBoundaries = function (measurement) {
                var measurementValue = measurement;
                switch (type) {
                    case utils.types.BLOOD_PRESSURE:
                    min = Math.min(measurementValue.diastolic, min);
                    max = Math.max(measurementValue.systolic, max);
                    break;
                    case utils.types.BLOOD_SUGAR:
                    min = Math.min(measurementValue.value, min);
                    max = Math.max(measurementValue.value, max);
                    break;
                    case utils.types.CONTINUOUS_BLOOD_SUGAR:
                    min = Math.min(measurementValue.value, min);
                    max = Math.max(measurementValue.value, max);
                    break;
                    default:
                    min = Math.min(measurementValue, min);
                    max = Math.max(measurementValue, max);
                    break;
                }
            };

            measurements.forEach(function (measurement) {
                adjustBoundaries(measurement.measurement);
            });

            return {
                min: min,
                max: max
            };

        };

        return {
            y: y
        };

    });

}());
