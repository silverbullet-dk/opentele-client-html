(function() {
    'use strict';

    describe('opentele.plotServices.augment module', function () {

        beforeEach(module('opentele.plotServices.augment'));

        describe('augment', function() {
            var augment, bloodPressureMeasurements, bloodSugarMeasurements;

            beforeEach(function() {

                bloodPressureMeasurements = [
                    {
                        "timestamp": "2014-11-11T23:05:00.000+01:00",
                        "measurement": {
                            systolic: 120,
                            diastolic: 90
                        }
                    },
                    {
                        "timestamp": "2014-11-08T15:14:00.000+01:00",
                        "measurement": {
                            systolic: 153,
                            diastolic: 100
                        }
                    },
                    {
                        "timestamp": "2014-11-06T06:27:00.000+01:00",
                        "measurement": {
                            systolic: 174,
                            diastolic: 120
                        }
                    },
                    {
                        "timestamp": "2014-10-19T19:41:00.000+01:00",
                        "measurement": {
                            systolic: 213,
                            diastolic: 160
                        }
                    },
                    {
                        "timestamp": "2014-09-19T11:45:00.000+02:00",
                        "measurement": {
                            systolic: 190,
                            diastolic: 130
                        }
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

            });

            beforeEach(inject(function(_augment_) {
                augment = _augment_;
            }));

            it('should augment measurements with date and time', function() {
                var resultMeasurements = augment.withDateAndTime(bloodPressureMeasurements);
                expect(resultMeasurements[0].date).toEqual("11/11/2014");
                expect(resultMeasurements[0].time).toEqual("11:05 PM");

                expect(resultMeasurements[1].date).toEqual("11/08/2014");
                expect(resultMeasurements[1].time).toEqual("3:14 PM");

                expect(resultMeasurements[4].date).toEqual("09/19/2014");
                expect(resultMeasurements[4].time).toEqual("11:45 AM");

            });

            it('should augment measurements with normalized dates', function() {
                var resultMeasurements = augment.withNormalizedDates(bloodSugarMeasurements);

                expect(resultMeasurements.length).toEqual(6);
                expect(new Date(resultMeasurements[0].timestamp)).toEqual(new Date('1970-01-02T20:43:00+01:00'));
                expect(new Date(resultMeasurements[1].timestamp)).toEqual(new Date('1970-01-02T17:14:00+01:00'));
                expect(new Date(resultMeasurements[2].timestamp)).toEqual(new Date('1970-01-02T13:35:00+01:00'));
                expect(new Date(resultMeasurements[3].timestamp)).toEqual(new Date('1970-01-02T08:15:00+01:00'));
                expect(new Date(resultMeasurements[4].timestamp)).toEqual(new Date('1970-01-02T05:36:00+01:00'));
                expect(new Date(resultMeasurements[5].timestamp)).toEqual(new Date('1970-01-02T04:17:00+01:00'));
            });

        });

    });
}());
