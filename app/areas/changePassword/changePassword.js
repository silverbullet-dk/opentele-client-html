(function() {
    'use strict';

    var changePassword = angular.module('opentele.controllers.changePassword', [
        'ngRoute',
        'opentele',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.translations'
    ]);

    changePassword.config(function($routeProvider) {
        $routeProvider.when('/change_password', {
            title: 'CHANGE_PASSWORD_TITLE',
            templateUrl: 'areas/changePassword/changePassword.html'
        });
    });

    changePassword.controller('ChangePasswordCtrl', function($scope, $location, $translate, appContext, headerService, authentication) {
        $scope.model = {
            password: '',
            passwordRepeat: '',
            errorMessages: []
        };

        var changeIfValid = function() {
            if ($scope.model.password !== $scope.model.passwordRepeat) {
                $scope.model.errorMessages = [$translate.instant('CHANGE_PASSWORD_FORM_ERROR_MATCH')];
                return;
            }
            tryChangePassword();
        };

        var tryChangePassword = function() {
            var user = appContext.currentUser.get();
            $scope.model.showProgress = true;
            authentication.changePassword(user, $scope.model.password, $scope.model.passwordRepeat,
                function(changedUser) {
                    $scope.model.showProgress = false;
                    appContext.currentUser.set(changedUser);
                    $location.path('/menu');
                },
                function(status, response) {
                    $scope.model.showProgress = false;
                    switch(status) {
                        case 422:
                            $scope.model.errorMessages = response.message.split(',');
                            break;
                        case 401:
                            $scope.model.errorMessages = [$translate.instant(response.code)];
                            break;
                        default:
                            $scope.model.errorMessages = [$translate.instant('OPENTELE_DOWN_TEXT')];
                    }
                });
        };

        $scope.submit = function() {
            $scope.model.errorMessages = [];
            changeIfValid();
        };

        $scope.formInvalid = function() {
            return $scope.model.password.length === 0 || $scope.model.passwordRepeat.length === 0;
        };

        if (appContext.requestParams.containsKey('forceChange') &&
            appContext.requestParams.getAndClear('forceChange') === true) {
            headerService.setMainMenu(false);
            $scope.model.errorMessage = $translate.instant('CHANGE_PASSWORD_EXPIRED');
        }
    });
}());
