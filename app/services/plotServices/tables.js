(function() {
    'use strict';

    var tableServices = angular.module('opentele.plotServices.tables', [
        'opentele.plotServices'
    ]);

    tableServices.service('tables', function(utils, partition) {

        var render = function(model, currentMeasurement) {

            if (model.shouldHideTable) {
                model.measurements = [];
                return;
            }

            if (currentMeasurement.type === utils.types.BLOOD_SUGAR) {
                model.shouldShowStandardDayTable = true;
                var datePartitions = partition.byDate(currentMeasurement.measurements);
                model.measurementDates = partition.byTimeOfDay(datePartitions);

            } else {
                model.unit = currentMeasurement.unit;
                model.measurements = currentMeasurement.measurements;

                if (currentMeasurement.type === utils.types.BLOOD_PRESSURE) {
                    model.measurements = model.measurements.map(function(measurement) {
                        var measurementValue = measurement.measurement;
                        return {
                            "timestamp": measurement.timestamp,
                            "measurement": measurementValue.systolic +
                                "/" + measurementValue.diastolic
                        };
                    });
                }
            }

        };

        return {
            render: render
        };
    });

}());
