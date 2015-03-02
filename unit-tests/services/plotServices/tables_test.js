(function() {
    'use strict';

    describe('opentele.plotServices.tables module', function () {

        beforeEach(module('opentele.plotServices.tables'));

        describe('tables', function() {
            var tables, model, bloodPressureMeasurement, bloodSugarMeasurement,
                pulseMeasurement, calledPartitionByDate, calledPartitionByTimeOfDay;

            beforeEach(module(function($provide) {
                
                var partition = {
                    byDate: function(measurements) {
                        calledPartitionByDate = true;
                        return measurements;
                    },
                    byTimeOfDay: function(measurementDates) {
                        calledPartitionByTimeOfDay = true;
                        return measurementDates;
                    }
                };
                $provide.value('partition', partition);

            }));

            beforeEach(inject(function(_tables_) {
                tables = _tables_;
            }));

            beforeEach(function() {

                calledPartitionByDate = false;
                calledPartitionByTimeOfDay = false;
                
                model = {
                    shouldHideTable: false
                };

                bloodPressureMeasurement = {
                    "links": {
                        "self": "http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure"
                    },
                    "type": "blood_pressure",
                    "unit": "mmHg",
                    "measurements": [
                        {
                            "timestamp": "2014-11-11T00:00:00.000+02:00",
                            "measurement": {
                                systolic: 120,
                                diastolic: 90
                            }
                        },
                        {
                            "timestamp": "2014-11-08T00:00:00.000+02:00",
                            "measurement": {
                                systolic: 153,
                                diastolic: 100
                            }
                        }
                    ]
                };

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

            it('should set empty measurement if tables should be hidden', function() {
                model.shouldHideTable = true;
                tables.render(model, bloodPressureMeasurement);
                expect(model.measurements.length).toEqual(0);
            });

            it('should set model as expected for simple measurements', function() {
                tables.render(model, pulseMeasurement);
                expect(model.unit).toEqual(pulseMeasurement.unit);
                expect(model.measurements).toEqual(pulseMeasurement.measurements);
            });

            it('should set model as expected for blood pressure measurements', function() {
                tables.render(model, bloodPressureMeasurement);
                expect(model.unit).toEqual(bloodPressureMeasurement.unit);
                expect(model.measurements[0].measurement).toEqual('120/90');
                expect(model.measurements[0].timestamp).toEqual(bloodPressureMeasurement.measurements[0].timestamp);
                expect(model.measurements[1].measurement).toEqual('153/100');
                expect(model.measurements[1].timestamp).toEqual(bloodPressureMeasurement.measurements[1].timestamp);
            });

            it('should set model as expected for blood sugar measurements', function() {
                tables.render(model, bloodSugarMeasurement);
                expect(calledPartitionByDate).toEqual(true);
                expect(calledPartitionByTimeOfDay).toEqual(true);
            });

        });

    });

}());