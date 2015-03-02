(function() {
    'use strict';

    describe('opentele.restApiServices.measurements service', function() {

        var httpBackend, restConfig, httpProvider;
        var measurements;

        beforeEach(module('opentele.restApiServices.measurements'));

        beforeEach(function() {
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost/";
            restConfig.loginUrl = "patient/login";

            module(function($provide) {
                $provide.value('restConfig', restConfig);
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($http) {
            httpProvider = $http;
        }));

        beforeEach(inject(function(_measurements_, $httpBackend) {
            measurements = _measurements_;
            httpBackend = $httpBackend;
        }));

        describe('list all measurements for user', function() {

            it('should not invoke callback when status is 401', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        measurements: 'http://localhost/rest/patient/measurements'
                    }
                };
                httpBackend.whenGET(user.links.measurements).respond(401);

                measurements.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(false);
            });

            it('should throw exception when user has no link to myMeasurements', function() {
                expect(function() {
                    measurements.listFor({});
                }).toThrow();
                expect(function() {
                    measurements.listFor({links: {}});
                }).toThrow();
            });

            it('should invoke success callback when response is valid', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        measurements: 'http://localhost/rest/patient/measurements'
                    }
                };
                httpBackend.whenGET(user.links.measurements).respond({});

                measurements.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(true);
            });

            it('should transform response to client object', function() {
                var user = {
                    links: {
                        measurements: 'http://localhost/rest/patient/measurements'
                    }
                };
                httpBackend.whenGET(user.links.measurements).respond({
                    "links": {
                        "self": "http://localhost:5000/opentele-citizen-server/patient/measurements"
                    },
                    "measurements": [
                        {
                            "name": "blood_pressure",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/blood_pressure"
                            }
                        },
                        {
                            "name": "pulse",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/pulse"
                            }
                        },
                        {
                            "name": "bloodsugar",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/bloodsugar"
                            }
                        }
                    ]
                });

                var data = {};
                measurements.listFor(user, function(response) {
                    data = response;
                });

                httpBackend.flush();

                expect(data.measurements.length).toEqual(3);
                expect(data.measurements[0].name).toEqual("blood_pressure");
                expect(data.measurements[0].links.measurement).toEqual("http://localhost:5000/opentele-citizen-server/patient/measurements/blood_pressure");
                expect(data.measurements[1].name).toEqual("pulse");
                expect(data.measurements[1].links.measurement).toEqual("http://localhost:5000/opentele-citizen-server/patient/measurements/pulse");
                expect(data.measurements[2].name).toEqual("bloodsugar");
                expect(data.measurements[2].links.measurement).toEqual("http://localhost:5000/opentele-citizen-server/patient/measurements/bloodsugar");
            });

        });

        describe('get specific measurement', function() {
            var testMeasurement = {
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
                    },
                    {
                        "timestamp": "2014-11-06T00:00:00.000+02:00",
                        "measurement": {
                            systolic: 174,
                            diastolic: 120
                        }
                    }
                ]
            };

            it('should transform response to client object', function() {
                var measurementRef = {
                    "name": "blood_pressure",
                    "links": {
                        "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/blood_pressure"
                    }
                };

                var getUrl = measurementRef.links.measurement + "?filter=WEEK";
                httpBackend.whenGET(getUrl).respond(testMeasurement);

                var data = {};
                measurements.get(measurementRef, "WEEK", function(response) {
                    data = response;
                });
                httpBackend.flush();

                expect(data.type).toEqual("blood_pressure");
                expect(data.unit).toEqual("mmHg");

                expect(data.measurements[0].timestamp).toEqual("2014-11-11T00:00:00.000+02:00");
                expect(data.measurements[0].measurement.systolic).toEqual(120);
                expect(data.measurements[0].measurement.diastolic).toEqual(90);

                expect(data.measurements[1].timestamp).toEqual("2014-11-08T00:00:00.000+02:00");
                expect(data.measurements[1].measurement.systolic).toEqual(153);
                expect(data.measurements[1].measurement.diastolic).toEqual(100);

                expect(data.measurements[2].timestamp).toEqual("2014-11-06T00:00:00.000+02:00");
                expect(data.measurements[2].measurement.systolic).toEqual(174);
                expect(data.measurements[2].measurement.diastolic).toEqual(120);
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function() {
                    measurements.get({}, "WEEK", function(response) {});
                };
                var wrapperNoLink = function() {
                    measurements.get({links: {}}, "WEEK", function(response) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });
        });

    });
}());
