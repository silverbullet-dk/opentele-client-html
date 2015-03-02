(function() {
    'use strict';

    var partitionServices = angular.module('opentele.plotServices.partition', [
        'opentele.plotServices.partition'
    ]);

    partitionServices.service('partition', function() {

        var byDate = function(measurements) {
            var partitions = {};

            var keyifyTimestamp = function(timestamp) {
                var date = new Date(timestamp);
                var year = date.getFullYear();
                var month = (date.getMonth() + 1 > 9) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                var day = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate();
                return year + "-" + month + "-" + day;
            };

            measurements.forEach(function(measurement) {
                var key = keyifyTimestamp(measurement.timestamp);
                if (!partitions.hasOwnProperty(key)) {
                    partitions[key] = [];
                }
                partitions[key].push(measurement);
            });

            return partitions;
        };

        var byTimeOfDay = function(measurementDates) {

            var assignToPartition = function (partitionedMeasurement, measurement, hour) {
                if (0 <= hour && hour < 5) {
                    partitionedMeasurement.night.push(measurement);
                } else if (5 <= hour && hour < 11) {
                    partitionedMeasurement.morning.push(measurement);
                } else if (11 <= hour && hour < 17) {
                    partitionedMeasurement.afternoon.push(measurement);
                } else {
                    partitionedMeasurement.evening.push(measurement);
                }
            };

            return Object.keys(measurementDates).map(function(date) {

                var partitionedMeasurement = {
                    date: new Date(date),
                    night: [],
                    morning: [],
                    afternoon: [],
                    evening: []
                };

                measurementDates[date].forEach(function(measurement) {
                    var hour = new Date(measurement.timestamp).getHours();
                    assignToPartition(partitionedMeasurement, measurement, hour);
                });

                return partitionedMeasurement;
            });

        };

        return {
            byDate: byDate,
            byTimeOfDay: byTimeOfDay
        };

    });

}());
