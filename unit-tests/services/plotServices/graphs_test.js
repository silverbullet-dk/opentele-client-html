(function() {
    'use strict';

    describe('opentele.plotServices.graphs module', function () {

        beforeEach(module('opentele.plotServices.graphs'));

        describe('graphs', function() {
            var graphs, model;
            var bloodPressureMeasurement, bloodSugarMeasurement, pulseMeasurement;
            var generate, augment, utils;

            beforeEach(module(function($provide) {

                var generate = {
                    boundariesY: function(measurements, type) {
                        return {
                            min: 40,
                            max: 200
                        };
                    },
                    ticksXStandardDay: function() {
                        return [
                            "2014-11-11T20:00:00.000+02:00",
                            "2014-11-11T10:00:00.000+02:00",
                            "2014-11-11T00:00:00.000+02:00"
                        ];
                    },
                    ticksX: function(now, filter) {
                        return [
                            "2014-11-11T00:00:00.000+02:00",
                            "2014-11-10T00:00:00.000+02:00",
                            "2014-11-09T00:00:00.000+02:00",
                            "2014-11-08T00:00:00.000+02:00",
                            "2014-11-07T00:00:00.000+02:00",
                            "2014-11-06T00:00:00.000+02:00"
                        ];
                    },
                    ticksY: function(min, max, type) {
                        return [40,80,120,160,200];
                    },
                    formatStringXStandardDay: function() {
                        return "%H:%M";
                    },
                    formatStringX: function() {
                        return "%d/%m/%Y";
                    },
                    formatStringY: function(type) {
                        return "[formatStringY]";
                    },
                    labelY: function(unit) {
                        return "Beats per minute";
                    },
                    series: function(measurements, type) {
                        return measurements;
                    },
                    standardDaySeries: function(measurements, type) {
                        return measurements;
                    },
                    options: function(type, graphDescription, jqplot) {
                        return graphDescription;
                    },
                    normalizedMeasurementsByDate: function(measurements) {
                        return measurements;
                    }
                };
                $provide.value('generate', generate);

                var augment = {
                    withDateAndTime: function(measurements) {
                        return measurements;
                    },
                    withNormalizedDates: function(measurements) {
                        return measurements;
                    }
                };
                $provide.value('augment', augment);

                utils = {
                    types: {
                        BLOOD_PRESSURE: 'blood_pressure',
                        BLOOD_SUGAR: 'bloodsugar',
                        PULSE: 'pulse'
                    }
                };
                $provide.value('utils', utils);

            }));

            beforeEach(inject(function(_graphs_) {
                graphs = _graphs_;
            }));

            beforeEach(function() {

                model = {
                    shouldHideGraph: false,
                    measurement: {
                        name: 'Pulse'
                    }
                };

                bloodPressureMeasurement = [
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

                bloodSugarMeasurement = {
                    "links": {
                        "self": "http://localhost:5000/opentele-server/rest/patient/measurements/bloodsugar"
                    },
                    "type": "bloodsugar",
                    "unit": "mmol/L",
                    "measurements": [
                        {
                            "timestamp": "2014-11-09 16:43",
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
                            "timestamp": "2014-11-09 09:14",
                            "measurement": {
                                "value": 5.4,
                                "isAfterMeal": true,
                                "isBeforeMeal": false,
                                "isControlMeasurement": false,
                                "isOutOfBounds": false,
                                "otherInformation": "",
                                "hasTemperatureWarning": false
                            }
                        }
                    ]
                };

                pulseMeasurement = {
                    "links": {
                        "self": "http://localhost:5000/opentele-server/rest/patient/measurements/pulse"
                    },
                    "type": "pulse",
                    "unit": "BPM",
                    "measurements": [
                        {
                            "timestamp": "2014-11-11T00:00:00.000+02:00",
                            "measurement": 53
                        },
                        {
                            "timestamp": "2014-11-08T00:00:00.000+02:00",
                            "measurement": 55
                        },
                        {
                            "timestamp": "2014-11-06T00:00:00.000+02:00",
                            "measurement": 56
                        }
                    ]
                };

            });

            it('should set empty series if graph should be hidden', function() {
                model.shouldHideGraph = true;
                graphs.render(model, bloodPressureMeasurement, 'ALL');
                expect(model.series).toEqual(null);
                expect(model.options).toEqual({});
                expect(model.standardDaySeries).toEqual(null);
                expect(model.standardDayOptions).toEqual({});
            });

            it('should set model as expected for simple measurements', inject(function($window) {
                $window.$ = {};
                graphs.render(model, pulseMeasurement, 'ALL');

                expect(model.series).toBeDefined();
                expect(model.options).toBeDefined();
                expect(model.standardDaySeries).toEqual(null);
                expect(model.standardDayOptions).toEqual({});

                expect(model.series).toEqual(pulseMeasurement.measurements);
                expect(model.options).toEqual({
                    title: 'Pulse',
                    boundariesY: {
                        min: 40,
                        max: 200
                    },
                    ticksX: [
                        "2014-11-11T00:00:00.000+02:00",
                        "2014-11-10T00:00:00.000+02:00",
                        "2014-11-09T00:00:00.000+02:00",
                        "2014-11-08T00:00:00.000+02:00",
                        "2014-11-07T00:00:00.000+02:00",
                        "2014-11-06T00:00:00.000+02:00"
                    ],
                    ticksY: [40,80,120,160,200],
                    formatStringX: "%d/%m/%Y",
                    formatStringY: "[formatStringY]",
                    labelY: "Beats per minute"
                });
            }));

            it('should set model as expected for blood sugar measurements', inject(function($window) {
                $window.$ = {};
                graphs.render(model, bloodSugarMeasurement, 'ALL');

                expect(model.series).toBeDefined();
                expect(model.options).toBeDefined();
                expect(model.standardDaySeries).toBeDefined();
                expect(model.standardDayOptions).toBeDefined();

            }));

        });

    });

}());
