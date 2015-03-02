(function () {
    'use strict';

    var login = angular.module('opentele.controllers.login', [
        'ngRoute',
        'opentele',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.translations'
    ]);

    login.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'OPENTELE',
                templateUrl: 'areas/login/login.html',
                publicAccess: true
            })
            .when('/login', {
                title: 'OPENTELE',
                templateUrl: 'areas/login/login.html',
                publicAccess: true
            });
    });

    login.controller('LoginCtrl', function ($scope, $location, $translate,
                                            appContext, serverInfo, authentication,
                                            reminders, headerService) {
        var setupErrorMessage = function () {
            var key = 'authenticationError';
            if (!appContext.requestParams.containsKey(key)) {
                $scope.model.errorMessage = "";
                return;
            }

            var reason = appContext.requestParams.getAndClear(key);
            $scope.model.errorMessage = $translate.instant(reason);
        };

        var setupLoginForm = function (root) {
            $scope.model.showLoginForm = true;
            setupErrorMessage();

            $scope.submit = function () {
                authentication.login(root.links.patient, $scope.model.username, $scope.model.password,
                    function (data) {
                        appContext.currentUser.set(data);
                        reminders.update(appContext.currentUser.get());
                        if (data.passwordExpired === true) {
                            appContext.requestParams.set('forceChange', true);
                            $location.path('/change_password');
                            return;
                        }
                        $location.path('/menu');
                    },
                    function (status, response) {
                        switch(status) {
                            case 401:
                                $scope.model.errorMessage = $translate.instant(response.code);
                                break;
                            default:
                                $scope.model.errorMessage = $translate.instant('OPENTELE_DOWN_TEXT');
                        }
                    });
            };
        };

        var connectionError = function () {
            $scope.model.errorMessage = $translate.instant('OPENTELE_UNAVAILABLE_TEXT');
        };

        var setInitialState = function () {
            headerService.setHeader(false);
            if (typeof ($scope.model) === 'undefined') {
                $scope.model = {};
            }
            $scope.model.showLoginForm = false;
            $scope.model.password = '';
            $scope.model.errorMessage = '';
            logout();
        };

        var logout = function () {
            authentication.logout(function () {
                appContext.currentUser.clear();
            });
        };

        setInitialState();
        serverInfo.get(setupLoginForm, connectionError);
    });
}());
