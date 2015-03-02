(function() {
    'use strict';

    describe('opentele.plotServices.generate.series module', function () {

        beforeEach(module('opentele.plotServices.generate.series'));

        describe('series', function () {
            var series, bloodPressureMeasurements, bloodSugarMeasurements,
                continuousBloodSugarMeasurements, pulseMeasurements;

            beforeEach(inject(function (_series_) {
                series = _series_;
            }));

            beforeEach(function() {

                bloodPressureMeasurements = [
                    {
                        "timestamp": "2014-11-11T23:05:00.000+02:00",
                        "measurement": {
                            systolic: 120,
                            diastolic: 90
                        },
                        "date": "11/11/2014",
                        "time": "11:05 PM"
                    },
                    {
                        "timestamp": "2014-11-08T15:14:00.000+02:00",
                        "measurement": {
                            systolic: 153,
                            diastolic: 100
                        },
                        "date": "11/08/2014",
                        "time": "3:14 PM"
                    },
                    {
                        "timestamp": "2014-11-06T06:27:00.000+02:00",
                        "measurement": {
                            systolic: 174,
                            diastolic: 120
                        },
                        "date": "11/06/2014",
                        "time": "6:27 AM"
                    },
                    {
                        "timestamp": "2014-10-19T19:41:00.000+01:00",
                        "measurement": {
                            systolic: 213,
                            diastolic: 160
                        },
                        "date": "10/19/2014",
                        "time": "7:41 PM"
                    },
                    {
                        "timestamp": "2014-09-19T11:45:00.000+01:00",
                        "measurement": {
                            systolic: 190,
                            diastolic: 130
                        },
                        "date": "09/19/2014",
                        "time": "11:45 AM"
                    }
                ];

                bloodSugarMeasurements = [
                    {
                        "timestamp": "2014-11-09T21:43:00+02:00",
                        "measurement": {
                            "value": 3.4,
                            "isAfterMeal": false,
                            "isBeforeMeal": true,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "11/09/2014",
                        "time": "9:43 PM"
                    },
                    {
                        "timestamp": "2014-11-09T18:14:00+02:00",
                        "measurement": {
                            "value": 5.4,
                            "isAfterMeal": true,
                            "isBeforeMeal": false,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "11/09/2014",
                        "time": "6:14 PM"
                    },
                    {
                        "timestamp": "2014-11-09T14:35:00+02:00",
                        "measurement": {
                            "value": 7.3,
                            "isAfterMeal": false,
                            "isBeforeMeal": true,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "11/09/2014",
                        "time": "2:35 PM"
                    },
                    {
                        "timestamp": "2014-10-15T07:15:00+01:00",
                        "measurement": {
                            "value": 8.7,
                            "isAfterMeal": false,
                            "isBeforeMeal": false,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "10/15/2014",
                        "time": "3:00 PM"
                    },
                    {
                        "timestamp": "2014-06-28T04:36:00+01:00",
                        "measurement": {
                            "value": 3.5,
                            "isAfterMeal": true,
                            "isBeforeMeal": false,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "06/28/2014",
                        "time": "4:36 AM"
                    },
                    {
                        "timestamp": "2014-06-28T03:17:00+01:00",
                        "measurement": {
                            "value": 5.4,
                            "isAfterMeal": false,
                            "isBeforeMeal": true,
                            "isControlMeasurement": false,
                            "isOutOfBounds": false,
                            "otherInformation": "",
                            "hasTemperatureWarning": false
                        },
                        "date": "06/28/2014",
                        "time": "3:17 AM"
                    }
                ];

                continuousBloodSugarMeasurements = [
                    {
                        "timestamp": "2014-11-09T16:43:00.000+01:00",
                        "measurement": {
                            "value": 3.4,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "11/09/2014",
                        "time": "4:43 PM"
                    },
                    {
                        "timestamp": "2014-11-09T09:14:00.000+01:00",
                        "measurement": {
                            "value": 5.4,
                            "type": "coulometer_reading"
                        },
                        "date": "11/09/2014",
                        "time": "2:00 PM"
                    },
                    {
                        "timestamp": "2014-11-09T06:35:00.000+01:00",
                        "measurement": {
                            "value": 7.3,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "11/09/2014",
                        "time": "6:35 AM"
                    },
                    {
                        "timestamp": "2014-11-07T14:15:00.000+01:00",
                        "measurement": {
                            "value": 8.7,
                            "type": "meal",
                            "carboGrams": 9,
                            "foodType": "SNACK"
                        },
                        "date": "11/07/2014",
                        "time": "2:15 PM"
                    },
                    {
                        "timestamp": "2014-11-01T05:36:00.000+01:00",
                        "measurement": {
                            "value": 3.5,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "11/01/2014",
                        "time": "5:36 AM"
                    },
                    {
                        "timestamp": "2014-10-27T17:02:00.000+01:00",
                        "measurement": {
                            "value": 13.4,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "10/27/2014",
                        "time": "5:02 PM"
                    },
                    {
                        "timestamp": "2014-10-16T23:52:00.000+01:00",
                        "measurement": {
                            "value": 10.2,
                            "type": "state_of_health",
                            "stateOfHealth": "DIZZY"
                        },
                        "date": "10/16/2014",
                        "time": "11:52 PM"
                    },
                    {
                        "timestamp": "2014-10-02T16:37:00.000+01:00",
                        "measurement": {
                            "value": 2.9,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "10/02/2014",
                        "time": "4:37 PM"
                    },
                    {
                        "timestamp": "2014-09-05T18:18:00.000+01:00",
                        "measurement": {
                            "value": 9.2,
                            "type": "generic",
                            "indicatedEvent": "UNSELECTED_DEFAULT"
                        },
                        "date": "09/05/2014",
                        "time": "6:00 PM"
                    },
                    {
                        "timestamp": "2014-08-05T04:37:00.000+01:00",
                        "measurement": {
                            "value": 5.6,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "08/05/2014",
                        "time": "4:37 AM"
                    },
                    {
                        "timestamp": "2014-07-07T07:07:00.000+01:00",
                        "measurement": {
                            "value": 3.7,
                            "type": "exercise",
                            "exerciseType": "RUNNING",
                            "durationInMinutes": 15,
                            "exerciseIntensity": "MEDIUM"
                        },
                        "date": "07/07/2014",
                        "time": "7:07 AM"
                    },
                    {
                        "timestamp": "2014-06-01T05:34:00.000+01:00",
                        "measurement": {
                            "value": 5.9,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "06/01/2014",
                        "time": "5:34 AM"
                    },
                    {
                        "timestamp": "2014-05-15T03:37:00.000+01:00",
                        "measurement": {
                            "value": 7.3,
                            "type": "insulin",
                            "insulinType": "SHORT_ACTING",
                            "units": "5"
                        },
                        "date": "05/15/2014",
                        "time": "3:37 AM"
                    },
                    {
                        "timestamp": "2014-04-06T20:23:00.000+01:00",
                        "measurement": {
                            "value": 6.3,
                            "type": "continuous_blood_sugar_measurement"
                        },
                        "date": "04/06/2014",
                        "time": "8:23 PM"
                    }
                ];

                pulseMeasurements =  [
                    {
                        "timestamp": "2014-11-11T15:34:00.00+02:00",
                        "measurement": 53,
                        "date": "11/11/2014",
                        "time": "5:34 AM"
                    },
                    {
                        "timestamp": "2014-11-08T05:03:00.00+02:00",
                        "measurement": 55,
                        "date": "11/08/2014",
                        "time": "5:03 AM"
                    },
                    {
                        "timestamp": "2014-11-06T12:34:00.00+02:00",
                        "measurement": 56,
                        "date": "11/06/2014",
                        "time": "12:34 PM"
                    },
                    {
                        "timestamp": "2014-10-19T22:11:00.00+01:00",
                        "measurement": 62,
                        "date": "10/19/2014",
                        "time": "11:00 AM"
                    }
                ];

            });

            describe('general', function() {

                it('should return null when measurements is empty', function() {
                    var resultSeries = series.general([], 'pulse');
                    expect(resultSeries).toEqual(null);
                });

                it('should generate correct default series', function() {
                    var resultSeries = series.general(pulseMeasurements, 'pulse')[0];
                    expect(resultSeries.length).toEqual(4);

                    expect(resultSeries[0][0]).toEqual(pulseMeasurements[0].timestamp);
                    expect(resultSeries[0][1]).toEqual(pulseMeasurements[0].measurement);
                    expect(resultSeries[0][2]).toEqual(pulseMeasurements[0].date);
                    expect(resultSeries[0][3]).toEqual(pulseMeasurements[0].time);

                    expect(resultSeries[1][0]).toEqual(pulseMeasurements[1].timestamp);
                    expect(resultSeries[1][1]).toEqual(pulseMeasurements[1].measurement);
                    expect(resultSeries[1][2]).toEqual(pulseMeasurements[1].date);
                    expect(resultSeries[1][3]).toEqual(pulseMeasurements[1].time);

                    expect(resultSeries[2][0]).toEqual(pulseMeasurements[2].timestamp);
                    expect(resultSeries[2][1]).toEqual(pulseMeasurements[2].measurement);
                    expect(resultSeries[2][2]).toEqual(pulseMeasurements[2].date);
                    expect(resultSeries[2][3]).toEqual(pulseMeasurements[2].time);

                    expect(resultSeries[3][0]).toEqual(pulseMeasurements[3].timestamp);
                    expect(resultSeries[3][1]).toEqual(pulseMeasurements[3].measurement);
                    expect(resultSeries[3][2]).toEqual(pulseMeasurements[3].date);
                    expect(resultSeries[3][3]).toEqual(pulseMeasurements[3].time);
                });

                it('should generate correct blood pressure series', function() {
                    var resultSeries = series.general(bloodPressureMeasurements, 'blood_pressure');
                    expect(resultSeries.length).toEqual(2);
                    var systolicSeries = resultSeries[0];
                    var diastolicSeries = resultSeries[1];

                    expect(systolicSeries[0][0]).toEqual(bloodPressureMeasurements[0].timestamp);
                    expect(systolicSeries[0][1]).toEqual(bloodPressureMeasurements[0].measurement.systolic);
                    expect(systolicSeries[0][2]).toEqual(bloodPressureMeasurements[0].date);
                    expect(systolicSeries[0][3]).toEqual(bloodPressureMeasurements[0].time);
                    expect(diastolicSeries[0][0]).toEqual(bloodPressureMeasurements[0].timestamp);
                    expect(diastolicSeries[0][1]).toEqual(bloodPressureMeasurements[0].measurement.diastolic);
                    expect(diastolicSeries[0][2]).toEqual(bloodPressureMeasurements[0].date);
                    expect(diastolicSeries[0][3]).toEqual(bloodPressureMeasurements[0].time);

                    expect(systolicSeries[1][0]).toEqual(bloodPressureMeasurements[1].timestamp);
                    expect(systolicSeries[1][1]).toEqual(bloodPressureMeasurements[1].measurement.systolic);
                    expect(systolicSeries[1][2]).toEqual(bloodPressureMeasurements[1].date);
                    expect(systolicSeries[1][3]).toEqual(bloodPressureMeasurements[1].time);
                    expect(diastolicSeries[1][0]).toEqual(bloodPressureMeasurements[1].timestamp);
                    expect(diastolicSeries[1][1]).toEqual(bloodPressureMeasurements[1].measurement.diastolic);
                    expect(diastolicSeries[1][2]).toEqual(bloodPressureMeasurements[1].date);
                    expect(diastolicSeries[1][3]).toEqual(bloodPressureMeasurements[1].time);

                    expect(systolicSeries[4][0]).toEqual(bloodPressureMeasurements[4].timestamp);
                    expect(systolicSeries[4][1]).toEqual(bloodPressureMeasurements[4].measurement.systolic);
                    expect(systolicSeries[4][2]).toEqual(bloodPressureMeasurements[4].date);
                    expect(systolicSeries[4][3]).toEqual(bloodPressureMeasurements[4].time);
                    expect(diastolicSeries[4][0]).toEqual(bloodPressureMeasurements[4].timestamp);
                    expect(diastolicSeries[4][1]).toEqual(bloodPressureMeasurements[4].measurement.diastolic);
                    expect(diastolicSeries[4][2]).toEqual(bloodPressureMeasurements[4].date);
                    expect(diastolicSeries[4][3]).toEqual(bloodPressureMeasurements[4].time);
                });

                it('should generate correct blood sugar series', function() {
                    var resultSeries = series.general(bloodSugarMeasurements, 'bloodsugar');
                    expect(resultSeries.length).toEqual(3);
                    var beforeMealSeries = resultSeries[0];
                    var afterMealSeries = resultSeries[1];
                    var unknownSeries = resultSeries[2];

                    expect(beforeMealSeries[0][0]).toEqual(bloodSugarMeasurements[0].timestamp);
                    expect(beforeMealSeries[0][1]).toEqual(bloodSugarMeasurements[0].measurement.value);
                    expect(beforeMealSeries[0][2]).toEqual(bloodSugarMeasurements[0].date);
                    expect(beforeMealSeries[0][3]).toEqual(bloodSugarMeasurements[0].time);

                    expect(beforeMealSeries[1][0]).toEqual(bloodSugarMeasurements[2].timestamp);
                    expect(beforeMealSeries[1][1]).toEqual(bloodSugarMeasurements[2].measurement.value);
                    expect(beforeMealSeries[1][2]).toEqual(bloodSugarMeasurements[2].date);
                    expect(beforeMealSeries[1][3]).toEqual(bloodSugarMeasurements[2].time);

                    expect(beforeMealSeries[2][0]).toEqual(bloodSugarMeasurements[5].timestamp);
                    expect(beforeMealSeries[2][1]).toEqual(bloodSugarMeasurements[5].measurement.value);
                    expect(beforeMealSeries[2][2]).toEqual(bloodSugarMeasurements[5].date);
                    expect(beforeMealSeries[2][3]).toEqual(bloodSugarMeasurements[5].time);

                    expect(afterMealSeries[0][0]).toEqual(bloodSugarMeasurements[1].timestamp);
                    expect(afterMealSeries[0][1]).toEqual(bloodSugarMeasurements[1].measurement.value);
                    expect(afterMealSeries[0][2]).toEqual(bloodSugarMeasurements[1].date);
                    expect(afterMealSeries[0][3]).toEqual(bloodSugarMeasurements[1].time);

                    expect(afterMealSeries[1][0]).toEqual(bloodSugarMeasurements[4].timestamp);
                    expect(afterMealSeries[1][1]).toEqual(bloodSugarMeasurements[4].measurement.value);
                    expect(afterMealSeries[1][2]).toEqual(bloodSugarMeasurements[4].date);
                    expect(afterMealSeries[1][3]).toEqual(bloodSugarMeasurements[4].time);

                    expect(unknownSeries[0][0]).toEqual(bloodSugarMeasurements[3].timestamp);
                    expect(unknownSeries[0][1]).toEqual(bloodSugarMeasurements[3].measurement.value);
                    expect(unknownSeries[0][2]).toEqual(bloodSugarMeasurements[3].date);
                    expect(unknownSeries[0][3]).toEqual(bloodSugarMeasurements[3].time);

                });

                it('should generate correct continuous blood sugar series', function() {
                    var resultSeries = series.general(continuousBloodSugarMeasurements, 'continuous_blood_sugar_measurement');
                    expect(resultSeries.length).toEqual(7);
                    var continuousBloodSugarEventSeries = resultSeries[0];
                    var coulometerReadingEventSeries = resultSeries[1];
                    var insulinEventSeries = resultSeries[2];
                    var exerciseEventSeries = resultSeries[3];
                    var stateOfHealthEventSeries = resultSeries[4];
                    var mealEventSeries = resultSeries[5];
                    var genericEventSeries = resultSeries[6];

                    expect(continuousBloodSugarEventSeries.length).toEqual(8);
                    expect(coulometerReadingEventSeries.length).toEqual(1);
                    expect(insulinEventSeries.length).toEqual(1);
                    expect(exerciseEventSeries.length).toEqual(1);
                    expect(stateOfHealthEventSeries.length).toEqual(1);
                    expect(mealEventSeries.length).toEqual(1);
                    expect(genericEventSeries.length).toEqual(1);

                    expect(continuousBloodSugarEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[0].timestamp);
                    expect(continuousBloodSugarEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[0].measurement.value);
                    expect(continuousBloodSugarEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[0].date);
                    expect(continuousBloodSugarEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[0].time);

                    expect(continuousBloodSugarEventSeries[3][0]).
                        toEqual(continuousBloodSugarMeasurements[5].timestamp);
                    expect(continuousBloodSugarEventSeries[3][1]).
                        toEqual(continuousBloodSugarMeasurements[5].measurement.value);
                    expect(continuousBloodSugarEventSeries[3][2]).
                        toEqual(continuousBloodSugarMeasurements[5].date);
                    expect(continuousBloodSugarEventSeries[3][3]).
                        toEqual(continuousBloodSugarMeasurements[5].time);

                    expect(coulometerReadingEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[1].timestamp);
                    expect(coulometerReadingEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[1].measurement.value);
                    expect(coulometerReadingEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[1].date);
                    expect(coulometerReadingEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[1].time);

                    expect(insulinEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[12].timestamp);
                    expect(insulinEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[12].measurement.value);
                    expect(insulinEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[12].date);
                    expect(insulinEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[12].time);
                    expect(insulinEventSeries[0][4]).
                        toMatch(continuousBloodSugarMeasurements[12].measurement.insulinType);
                    expect(insulinEventSeries[0][5]).
                        toMatch(continuousBloodSugarMeasurements[12].measurement.units);

                    expect(exerciseEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[10].timestamp);
                    expect(exerciseEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[10].measurement.value);
                    expect(exerciseEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[10].date);
                    expect(exerciseEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[10].time);
                    expect(exerciseEventSeries[0][4]).
                        toMatch(continuousBloodSugarMeasurements[10].measurement.exerciseType);
                    expect(exerciseEventSeries[0][5]).
                        toMatch(continuousBloodSugarMeasurements[10].measurement.durationInMinutes);
                    expect(exerciseEventSeries[0][6]).
                        toMatch(continuousBloodSugarMeasurements[10].measurement.exerciseIntensity);

                    expect(mealEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[3].timestamp);
                    expect(mealEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[3].measurement.value);
                    expect(mealEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[3].date);
                    expect(mealEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[3].time);
                    expect(mealEventSeries[0][4]).
                        toMatch(continuousBloodSugarMeasurements[3].measurement.carboGrams);
                    expect(mealEventSeries[0][5]).
                        toMatch(continuousBloodSugarMeasurements[3].measurement.foodType);

                    expect(stateOfHealthEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[6].timestamp);
                    expect(stateOfHealthEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[6].measurement.value);
                    expect(stateOfHealthEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[6].date);
                    expect(stateOfHealthEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[6].time);
                    expect(stateOfHealthEventSeries[0][4]).
                        toMatch(continuousBloodSugarMeasurements[6].measurement.stateOfHealth);

                    expect(genericEventSeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[8].timestamp);
                    expect(genericEventSeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[8].measurement.value);
                    expect(genericEventSeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[8].date);
                    expect(genericEventSeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[8].time);
                    expect(genericEventSeries[0][4]).
                        toMatch(continuousBloodSugarMeasurements[8].measurement.indicatedEvent);

                });

            });

            describe('standardDay', function() {

                it('should generate correct blood sugar series for standard day', function() {
                    var normalSeries = series.general(bloodSugarMeasurements, 'bloodsugar');
                    var standardDaySeries = series.standardDay(bloodSugarMeasurements, 'bloodsugar');
                    expect(normalSeries).toEqual(standardDaySeries);
                });

                it('should generate correct continuous blood sugar series for standard day', function() {
                    var resultSeries = series.standardDay(continuousBloodSugarMeasurements, 'continuous_blood_sugar_measurement');
                    expect(resultSeries.length).toEqual(1);
                    var standardDaySeries = resultSeries[0];
                    expect(standardDaySeries.length).toEqual(8);

                    expect(standardDaySeries[0][0]).
                        toEqual(continuousBloodSugarMeasurements[0].timestamp);
                    expect(standardDaySeries[0][1]).
                        toEqual(continuousBloodSugarMeasurements[0].measurement.value);
                    expect(standardDaySeries[0][2]).
                        toEqual(continuousBloodSugarMeasurements[0].date);
                    expect(standardDaySeries[0][3]).
                        toEqual(continuousBloodSugarMeasurements[0].time);

                    expect(standardDaySeries[1][0]).
                        toEqual(continuousBloodSugarMeasurements[2].timestamp);
                    expect(standardDaySeries[1][1]).
                        toEqual(continuousBloodSugarMeasurements[2].measurement.value);
                    expect(standardDaySeries[1][2]).
                        toEqual(continuousBloodSugarMeasurements[2].date);
                    expect(standardDaySeries[1][3]).
                        toEqual(continuousBloodSugarMeasurements[2].time);

                    expect(standardDaySeries[3][0]).
                        toEqual(continuousBloodSugarMeasurements[5].timestamp);
                    expect(standardDaySeries[3][1]).
                        toEqual(continuousBloodSugarMeasurements[5].measurement.value);
                    expect(standardDaySeries[3][2]).
                        toEqual(continuousBloodSugarMeasurements[5].date);
                    expect(standardDaySeries[3][3]).
                        toEqual(continuousBloodSugarMeasurements[5].time);
                });
            });

        });

    });
}());
