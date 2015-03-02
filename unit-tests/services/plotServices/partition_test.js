(function() {
    'use strict';

    describe('opentele.plotServices.partition module', function () {

        beforeEach(module('opentele.plotServices.partition'));

        describe('partition', function() {
            var partition, bloodSugarMeasurements, datePartitionedBloodSugarMeasurements;

            beforeEach(inject(function(_partition_) {
                partition = _partition_;
            }));

            beforeEach(function() {
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
                        }
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
                        }
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
                        }
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
                        }
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
                        }
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
                        }
                    }
                ];

                datePartitionedBloodSugarMeasurements = {
                    '2014-11-09': [
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
                            }
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
                            }
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
                            }
                        }
                    ],
                    '2014-10-15': [
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
                            }
                        }
                    ],
                    '2014-06-28': [
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
                            }
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
                            }
                        }
                    ]
                };
            });

            it('should partition blood sugar measurements by date', function() {
                var resultMeasurements = partition.byDate(bloodSugarMeasurements);

                expect(resultMeasurements.hasOwnProperty('2014-11-09')).toEqual(true);
                expect(resultMeasurements.hasOwnProperty('2014-10-15')).toEqual(true);
                expect(resultMeasurements.hasOwnProperty('2014-06-28')).toEqual(true);

                expect(resultMeasurements['2014-11-09'].length).toEqual(3);
                expect(resultMeasurements['2014-10-15'].length).toEqual(1);
                expect(resultMeasurements['2014-06-28'].length).toEqual(2);

                var firstMeasurements = resultMeasurements['2014-11-09'];
                var secondMeasurements = resultMeasurements['2014-10-15'];
                var thirdMeasurements = resultMeasurements['2014-06-28'];

                expect(firstMeasurements[0]).toEqual(bloodSugarMeasurements[0]);
                expect(firstMeasurements[1]).toEqual(bloodSugarMeasurements[1]);
                expect(firstMeasurements[2]).toEqual(bloodSugarMeasurements[2]);

                expect(secondMeasurements[0]).toEqual(bloodSugarMeasurements[3]);

                expect(thirdMeasurements[0]).toEqual(bloodSugarMeasurements[4]);
                expect(thirdMeasurements[1]).toEqual(bloodSugarMeasurements[5]);

            });

            it('should partition date partitioned blood sugar measurements by time of day', function() {
                var resultMeasurements = partition.byTimeOfDay(datePartitionedBloodSugarMeasurements);

                expect(resultMeasurements.length).toEqual(3);

                var firstMeasurements = resultMeasurements[0];
                var secondMeasurements = resultMeasurements[1];
                var thirdMeasurements = resultMeasurements[2];

                expect(firstMeasurements.date).toEqual(new Date('2014-11-09T01:00:00+01:00'));
                expect(secondMeasurements.date).toEqual(new Date('2014-10-15T02:00:00+02:00'));
                expect(thirdMeasurements.date).toEqual(new Date('2014-06-28T02:00:00+02:00'));

                expect(firstMeasurements.night.length).toEqual(0);
                expect(firstMeasurements.morning.length).toEqual(0);
                expect(firstMeasurements.afternoon.length).toEqual(1);
                expect(firstMeasurements.evening.length).toEqual(2);

                expect(secondMeasurements.night.length).toEqual(0);
                expect(secondMeasurements.morning.length).toEqual(1);
                expect(secondMeasurements.afternoon.length).toEqual(0);
                expect(secondMeasurements.evening.length).toEqual(0);

                expect(thirdMeasurements.night.length).toEqual(1);
                expect(thirdMeasurements.morning.length).toEqual(1);
                expect(thirdMeasurements.afternoon.length).toEqual(0);
                expect(thirdMeasurements.evening.length).toEqual(0);

                expect(firstMeasurements.afternoon[0]).toEqual(bloodSugarMeasurements[2]);
                expect(firstMeasurements.evening[0]).toEqual(bloodSugarMeasurements[0]);
                expect(firstMeasurements.evening[1]).toEqual(bloodSugarMeasurements[1]);

                expect(secondMeasurements.morning[0]).toEqual(bloodSugarMeasurements[3]);

                expect(thirdMeasurements.night[0]).toEqual(bloodSugarMeasurements[5]);
                expect(thirdMeasurements.morning[0]).toEqual(bloodSugarMeasurements[4]);
            });

        });
    });
}());