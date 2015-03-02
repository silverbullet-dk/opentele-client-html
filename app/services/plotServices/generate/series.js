(function() {
    'use strict';

    var seriesServices = angular.module('opentele.plotServices.generate.series', [
        'opentele.plotServices',
        'opentele.plotServices.generate',
        'opentele.translations'
    ]);

    seriesServices.service('series', function ($translate, utils) {

        var generateBloodPressureSeries = function(measurements) {
            var systolicMeasurements = [];
            var diastolicMeasurements = [];

            var addToSeries = function(measurement) {
                var timestamp = measurement.timestamp;
                var date = measurement.date;
                var time = measurement.time;
                var systolic = measurement.measurement.systolic;
                var diastolic = measurement.measurement.diastolic;
                var systolicMeasurement = [timestamp, systolic, date, time];
                var diastolicMeasurement = [timestamp, diastolic, date, time];

                systolicMeasurements.push(systolicMeasurement);
                diastolicMeasurements.push(diastolicMeasurement);
            };

            measurements.forEach(function (measurement) {
                addToSeries(measurement);
            });

            return [systolicMeasurements, diastolicMeasurements];
        };

        var generateBloodSugarSeries = function(measurements) {
            var beforeMealMeasurements = [];
            var afterMealMeasurements = [];
            var unknownMeasurements = [];

            var addToCorrespondingSeries = function(measurement) {
                var timestamp = measurement.timestamp;
                var value = measurement.measurement.value;
                var date = measurement.date;
                var time = measurement.time;
                var isAfterMeal = measurement.measurement.isAfterMeal;
                var isBeforeMeal = measurement.measurement.isBeforeMeal;
                var seriesMeasurement = [timestamp, value, date, time];

                if (!isAfterMeal && isBeforeMeal) {
                    beforeMealMeasurements.push(seriesMeasurement);
                } else if (isAfterMeal && !isBeforeMeal) {
                    afterMealMeasurements.push(seriesMeasurement);
                } else {
                    unknownMeasurements.push(seriesMeasurement);
                }
            };

            measurements.forEach(function (measurement) {
                addToCorrespondingSeries(measurement);
            });

            return [beforeMealMeasurements, afterMealMeasurements, unknownMeasurements];
        };

        var generateContinuousBloodSugarSeries = function(measurements) {
            var continuousBloodSugarEventSeries = [];
            var coulometerReadingEventSeries = [];
            var insulinEventSeries = [];
            var exerciseEventSeries = [];
            var stateOfHealthEventSeries = [];
            var mealEventSeries = [];
            var genericEventSeries = [];

            var addToCorrespondingSeries = function(measurement) {
                var timestamp = measurement.timestamp;
                var value = measurement.measurement.value;
                var date = measurement.date;
                var time = measurement.time;
                var type = measurement.measurement.type;
                var seriesMeasurement = [timestamp, value, date, time];

                switch (type) {
                    case "continuous_blood_sugar_measurement":
                        continuousBloodSugarEventSeries.push(seriesMeasurement);
                        break;
                    case "coulometer_reading":
                        coulometerReadingEventSeries.push(seriesMeasurement);
                        break;
                    case "insulin":
                        var insulinType = $translate.instant('INSULIN_TYPE') + ": " +
                            measurement.measurement.insulinType;
                        var units = $translate.instant('INSULIN_UNITS') + ": " +
                            measurement.measurement.units;
                        seriesMeasurement.push(insulinType);
                        seriesMeasurement.push(units);
                        insulinEventSeries.push(seriesMeasurement);
                        break;
                    case "exercise":
                        var exerciseType = $translate.instant('EXERCISE_TYPE') + ": " +
                            measurement.measurement.exerciseType;
                        var durationInMinutes = $translate.instant('EXERCISE_DURATION_IN_MINUTES') + ": " +
                            measurement.measurement.durationInMinutes;
                        var exerciseIntensity = $translate.instant('EXERCISE_INTENSITY') + ": " +
                            measurement.measurement.exerciseIntensity;
                        seriesMeasurement.push(exerciseType);
                        seriesMeasurement.push(durationInMinutes);
                        seriesMeasurement.push(exerciseIntensity);
                        exerciseEventSeries.push(seriesMeasurement);
                        break;
                    case "meal":
                        var carboGrams = $translate.instant('MEAL_CARBO_GRAMS') + ": " +
                            measurement.measurement.carboGrams;
                        var foodType = $translate.instant('MEAL_FOOD_TYPE') + ": " +
                            measurement.measurement.foodType;
                        seriesMeasurement.push(carboGrams);
                        seriesMeasurement.push(foodType);
                        mealEventSeries.push(seriesMeasurement);
                        break;
                    case "state_of_health":
                        var stateOfHealth = $translate.instant('STATE_OF_HEALTH') + ": " +
                            measurement.measurement.stateOfHealth;
                        seriesMeasurement.push(stateOfHealth);
                        stateOfHealthEventSeries.push(seriesMeasurement);
                        break;
                    case "generic":
                        var indicatedEvent = $translate.instant('GENERIC_INDICATED_EVENT') + ": " +
                            measurement.measurement.indicatedEvent;
                        seriesMeasurement.push(indicatedEvent);
                        genericEventSeries.push(seriesMeasurement);
                        break;
                    default:
                        console.log("Unknown continuous blood sugar measurement: " + type);
                }
            };

            measurements.forEach(function(measurement) {
                addToCorrespondingSeries(measurement);
            });

            return [
                continuousBloodSugarEventSeries,
                coulometerReadingEventSeries,
                insulinEventSeries,
                exerciseEventSeries,
                stateOfHealthEventSeries,
                mealEventSeries,
                genericEventSeries
            ];
        };

        var general = function(measurements, type) {
            if (measurements.length === 0) {
                return null;
            }

            switch (type) {
                case utils.types.BLOOD_PRESSURE:
                    return generateBloodPressureSeries(measurements);
                case utils.types.BLOOD_SUGAR:
                    return generateBloodSugarSeries(measurements);
                case utils.types.CONTINUOUS_BLOOD_SUGAR:
                    return generateContinuousBloodSugarSeries(measurements);
                default:
                    return [
                        measurements.map(function(measurement) {
                            var timestamp = measurement.timestamp;
                            var value = measurement.measurement;
                            var date = measurement.date;
                            var time = measurement.time;
                            return [timestamp, value, date, time];
                        })
                    ];
            }
        };

        var standardDay = function(measurements, type) {
            if (measurements.length === 0) {
                return null;
            }

            switch (type) {
                case utils.types.BLOOD_SUGAR:
                    return generateBloodSugarSeries(measurements);
                case utils.types.CONTINUOUS_BLOOD_SUGAR:
                    var cgmMeasurements = measurements.filter(function(measurement) {
                        return measurement.measurement.type === "continuous_blood_sugar_measurement";
                    });
                    cgmMeasurements = cgmMeasurements.map(function(measurement) {
                        var timestamp = measurement.timestamp;
                        var value = measurement.measurement.value;
                        var date = measurement.date;
                        var time = measurement.time;
                        return [timestamp, value, date, time];
                    });
                    return [cgmMeasurements];
                default:
                    console.log("Unknown type for standard day series");
            }
        };

        return {
            general: general,
            standardDay: standardDay
        };

    });

}());
