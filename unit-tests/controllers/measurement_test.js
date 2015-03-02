(function () {
    'use strict';

    describe('opentele.controllers.measurement', function () {
        var runController, scope, location, appContext, measurements,
            plotService, restServiceResult;
        var model, filter, type, currentMeasurement;

        beforeEach(module('opentele.controllers.measurement'));

        beforeEach(module('opentele.stateServices'));

        // mock services
        beforeEach(module(function($provide) {

            var filters = {
                WEEK: 'WEEK'
            };

            $provide.value('filters', filters);

            plotService = {
                setGraphAndTableFlags: function(aModel, aType) {
                    type = aType;
                },
                renderFilters: function(aModel) {
                    model = aModel;
                },
                renderTables: function(aModel, aMeasurement) {
                    currentMeasurement = aMeasurement;
                },
                renderGraphs: function(aModel, aMeasurement, aFilter) {
                    filter = aFilter;
                }
            };
            $provide.value('plotService', plotService);

            restServiceResult = {
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

            measurements = {
                get: function(model, filter, onSuccess) {
                    return onSuccess(restServiceResult);
                }
            };
            $provide.value('measurements', measurements);
        }));

        beforeEach(function() {
            model = null;
            filter = null;
        });

        beforeEach(inject(function ($rootScope, $location, $controller, _appContext_, _measurements_, _headerService_, _plotService_, _filters_) {
            scope = $rootScope.$new();
            location = $location;
            appContext = _appContext_;
            appContext.requestParams.set("selectedMeasurement", {
                "name": "blood_pressure",
                "links": {
                    "measurement": "http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure"
                }
            });
            runController = function () {
                $controller('MeasurementCtrl', {
                    '$scope': scope,
                    '$location': location,
                    'appContext': _appContext_,
                    'measurements': _measurements_,
                    'headerService': _headerService_,
                    'plotService': _plotService_,
                    'filters': _filters_
                });
            };
        }));

        it('should have a $scope', function() {
            runController();

            expect(scope).toBeDefined();
        });

        it('should have a measurement', function() {
            runController();

            expect(scope.model.measurement).toBeDefined();
            expect(scope.model.measurement.name).toEqual("blood_pressure");
            expect(scope.model.measurement.links.measurement).toEqual("http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure");
        });

        it('should call plotService with model', function() {
            runController();
            expect(model).toEqual({
                "measurement": {
                    "name": "blood_pressure",
                    "links": {
                        "measurement": "http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure"
                    }
                },
                "filter": 'WEEK'
            });
        });

        it('should call plotService with model and filter', function() {
            runController();
            scope.showFilter('WEEK');

            expect(model).toEqual({
                "measurement": {
                    "name": "blood_pressure",
                    "links": {
                        "measurement": "http://localhost:5000/opentele-server/rest/patient/measurements/blood_pressure"
                    }
                },
                "filter": 'WEEK'
            });
            expect(filter).toEqual('WEEK');
        });

        it('should set popup offsets as expected', function() {
            runController();

            var bloodSugarMeasurement = {
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
            };

            var event = {
                pageX: 1024,
                pageY: 783
            };

            scope.showPopup(bloodSugarMeasurement, event);

            expect(scope.model.popupMeasurement).toEqual(bloodSugarMeasurement);
            expect(scope.model.showPopup).toEqual(true);
            expect(scope.model.popupOffsetX).toEqual(1024 - 480 / 2);
            expect(scope.model.popupOffsetY).toEqual(783 - 220 / 2);
        });

        it('should set flag to false when calling hidePopup', function() {
            runController();
            scope.model.showPopup = true;

            scope.hidePopup();
            expect(scope.model.showPopup).toEqual(false);
        });

    });
}());
