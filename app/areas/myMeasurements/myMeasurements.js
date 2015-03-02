(function() {
    'use strict';

    var myMeasurements = angular.module('opentele.controllers.myMeasurements', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices'
    ]);

    myMeasurements.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/my_measurements', {
                title: 'MY_MEASUREMENTS_TITLE',
                templateUrl: 'areas/myMeasurements/myMeasurements.html'
            });
        }]);

    myMeasurements.controller('MyMeasurementsCtrl', function($scope, $location,
                                                             headerService, appContext, measurements) {

        $scope.showMeasurement = function(selected) {
            var measurementRef = $scope.model.measurements[selected];
            appContext.requestParams.set('selectedMeasurement', measurementRef);
            $location.path('/measurement');
        };

        headerService.setBack(false);
        $scope.model = {};
        var user = appContext.currentUser.get();

        measurements.listFor(user, function(data) {

            data.measurements.forEach(function(measurement) {
                measurement.name = 'MEASUREMENT_TYPE_' + measurement.name.toUpperCase();
            });

            $scope.model = data;
            if (data.measurements.length === 1) {
                $location.replace('/my_measurements', '/menu');
                $scope.showMeasurement(0);
            }
        });

    });
}());
