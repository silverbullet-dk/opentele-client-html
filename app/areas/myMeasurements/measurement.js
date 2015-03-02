(function() {
    'use strict';

    var measurement = angular.module('opentele.controllers.measurement', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.plotServices'
    ]);

    measurement.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/measurement', {
                title: 'MEASUREMENT_TITLE',
                templateUrl: 'areas/myMeasurements/measurement.html'
            });
        }]);

    measurement.controller('MeasurementCtrl', function($scope, $window, $location, appContext,
                                                       measurements, headerService,
                                                       plotService, filters) {

        $scope.$on('backClick', function() {
            $window.history.back();
        });

        $scope.showPopup = function(measurement, event) {
            // TODO: ideally this should be looser coupled to what is happening in the DOM.
            var POPUP_WIDTH = 480;
            var POPUP_HEIGHT = 220;
            $scope.model.popupMeasurement = measurement;
            $scope.model.showPopup = true;
            $scope.model.popupOffsetX = event.pageX - POPUP_WIDTH / 2;
            $scope.model.popupOffsetY = event.pageY - POPUP_HEIGHT / 2;
        };

        $scope.hidePopup = function() {
            $scope.model.showPopup = false;
        };

        $scope.showFilter = function(filter) {
            render($scope.model, filter);
        };

        var render = function(model, filter) {
            if (filter === undefined || filter === null) {
                filter = filters.WEEK;
            }
            model.filter = filter;

            measurements.get(model.measurement, filter, function(currentMeasurement) {
                plotService.setGraphAndTableFlags(model, currentMeasurement.type);
                plotService.renderFilters(model);
                plotService.renderTables(model, currentMeasurement);
                plotService.renderGraphs(model, currentMeasurement, filter);
            });
        };

        headerService.setBack(true);
        if (!appContext.requestParams.containsKey('selectedMeasurement')) {
            $location.path('/menu');
            return;
        }

        $scope.model = {};
        $scope.model.measurement = appContext.requestParams.getAndClear('selectedMeasurement');
        render($scope.model);
    });
}());
