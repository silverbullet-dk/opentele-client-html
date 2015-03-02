(function() {
    'use strict';

    var header = angular.module('opentele.directives.header', [
        'opentele.stateServices'
    ]);

    header.directive('navigationHeader', function ($location, headerService, appContext) {

        return {
            restrict: 'A',
            link: function (scope) {

                scope.$watch(function () {
                        return headerService.getHeader();
                    },

                    function (value) {
                        if (typeof value !== 'undefined' && value === true) {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.showHeader = true;
                            if (appContext.currentUser.isValid()) {
                                var user = appContext.currentUser.get();
                                scope.headerModel.fullUsername =
                                    user.firstName + " " + user.lastName;
                            } else {
                                $location.path('/login');
                            }
                        } else {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.showHeader = false;
                        }
                    });

                scope.$watch(function () {
                        return headerService.getMainMenu();
                    },

                    function (value) {
                        if (typeof value !== 'undefined' && value === true) {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.hideMainMenuButton = false;
                        } else {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.hideMainMenuButton = true;
                        }
                    });

                scope.$watch(function () {
                        return headerService.getBack();
                    },

                    function (value) {
                        if (typeof value !== 'undefined' && value === true) {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.showBackButton = true;
                        } else {
                            if (typeof(scope.headerModel) === 'undefined') {
                                scope.headerModel = {};
                            }
                            scope.headerModel.showBackButton = false;
                        }
                    });
            },
            templateUrl: 'areas/header/header.html'
        };
    });
}());
