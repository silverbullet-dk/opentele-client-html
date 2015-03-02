(function() {
    'use strict';

    describe('opentele.controllers.myMeasurements module', function() {

        beforeEach(module('opentele.controllers.myMeasurements'));

        beforeEach(module('opentele.stateServices'));

        describe('MyMeasurementsCtrl positive', function() {
            var scope, location, runController, appContext, measurements, restServiceResult;

            // mock services
            beforeEach(module(function($provide) {

                restServiceResult = {
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
                            "name": "weight",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/weight"
                            }
                        },
                        {
                            "name": "bloodsugar",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/bloodsugar"
                            }
                        }
                    ]
                };

                measurements = {
                    listFor: function(user, onSuccess) {
                        onSuccess(restServiceResult);
                    }
                };
                $provide.value('measurements', measurements);
            }));

            // instantiate controller
            beforeEach(inject(function($rootScope, $location, $controller, _appContext_, _headerService_, _measurements_) {
                scope = $rootScope.$new();
                location = $location;
                appContext = _appContext_;
                appContext.currentUser.set({});
                runController = function() {
                    $controller('MyMeasurementsCtrl', {
                        '$scope': scope,
                        '$location': location,
                        'headerService': _headerService_,
                        'appContext': _appContext_,
                        'measurements': _measurements_
                    });
                };
            }));

            it('should have a $scope', function() {
                runController();

                expect(scope).toBeDefined();
            });

            it('should have measurements', function() {
                runController();

                expect(scope.model.measurements).toBeDefined();
                expect(scope.model.measurements.length).toEqual(4);
                expect(scope.model.measurements).toEqual(restServiceResult.measurements);
            });

            it('should open measurement when clicked', function() {
                runController();

                scope.showMeasurement(1);

                expect(location.path()).toEqual('/measurement');
                expect(appContext.requestParams.getAndClear('selectedMeasurement')).toEqual(restServiceResult.measurements[1]);
            });

            it('should automatically redirect to measurements if list only contains one', function () {
                restServiceResult = {
                    "measurements": [
                        {
                            "name": "blood_pressure",
                            "links": {
                                "measurement": "http://localhost:5000/opentele-citizen-server/patient/measurements/blood_pressure"
                            }
                        }
                    ]
                };
                runController();

                expect(location.path()).toEqual('/measurement');
            });
        });
    });
}());
