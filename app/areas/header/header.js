(function() {
    'use strict';

    var header = angular.module('opentele.controllers.header', [
    ]);

    header.controller('HeaderCtrl', function ($scope, $location) {

        $scope.goMainMenu = function () {
            $location.path('/menu');
            $scope.$parent.$broadcast('menuClick');
        };

        $scope.goBack = function () {
            $scope.$parent.$broadcast('backClick');
        };

        $scope.goLogout = function () {
            $location.path('/login');
        };

    });
}());
