(function () {
    'use strict';

    var interceptors = angular.module('opentele.restApiServices.interceptors', ['ngRoute', 'opentele.stateServices', 'opentele.restApiServices.httpNotifications'])
        .config(function ($httpProvider, httpNotificationsProvider) {
            $httpProvider.interceptors.push(function ($q, $location, appContext) {
                return {
                    responseError: function (rejection) {
                        if (rejection.config.errorPassThrough === true) {
                            return $q.reject(rejection);
                        }
                        var status = rejection.status;
                        if (status === 401) {
                            appContext.requestParams.set('authenticationError', 'LOGGED_OUT');
                            $location.path('/login');
                            return $q.reject(rejection);
                        }
                        $location.path('/error');
                        return $q.reject(rejection);
                    }
                };
            });
            $httpProvider.interceptors.push(function ($q) {
                return {
                    request: function (config) {
                        httpNotificationsProvider.fireRequestStarted();
                        return config;
                    },
                    response: function (response) {
                        httpNotificationsProvider.fireRequestEnded();
                        return response;
                    },

                    responseError: function (rejection)
                    {
                        httpNotificationsProvider.fireRequestEnded();
                        return $q.reject(rejection);
                    }
                };
            });
        });
}());
