(function() {
    'use strict';

    var augmentServices = angular.module('opentele.plotServices.augment', [
        'opentele.plotServices'
    ]);

    augmentServices.service('augment', function () {

        var clone = function(measurement) {
            return JSON.parse(JSON.stringify(measurement));
        };

        var withDateAndTime = function(measurements) {
            return measurements.map(function(measurement) {
                var clonedMeasurement = clone(measurement);
                var date = new Date(clonedMeasurement.timestamp);
                clonedMeasurement.date = moment(date).format('L');
                clonedMeasurement.time = moment(date).format('LT');
                return clonedMeasurement;
            });
        };

        var withNormalizedDates = function(measurements) {
            return measurements.map(function(measurement) {
                var clonedMeasurement = clone(measurement);
                var date = new Date(clonedMeasurement.timestamp);
                clonedMeasurement.timestamp = new Date('1970-01-03T00:00:00+02:00'); // arbitrary date
                clonedMeasurement.timestamp.setHours(date.getHours());
                clonedMeasurement.timestamp.setMinutes(date.getMinutes());
                return clonedMeasurement;
            });
        };

        return {
            withDateAndTime: withDateAndTime,
            withNormalizedDates: withNormalizedDates
        };

    });

}());