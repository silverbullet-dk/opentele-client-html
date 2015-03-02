(function() {
    'use strict';

    var opentele = angular.module('opentele', [
        'ngRoute',

        'opentele.config',
        'opentele.controllers',
        'opentele.directives',
        'opentele.exceptionHandler',
        'opentele.services',
        'opentele.translations',
        'templates-dist'
    ]);

    opentele.config(function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/login'
            });
    });

    opentele.controller('AppCtrl', function($scope, $window, $translate,
                                            languages, changeLocale) {

        $scope.$watch(function() {
            return $window.navigator.userLanguage;
        }, function (newValue, oldValue) {
            if (newValue !== undefined && newValue !== oldValue) {
                changeLocale(newValue);
            }
        });
    });

    opentele.run(function($rootScope, $location, $route, $translate,
                          headerService, appContext) {
        var setRouteEvents = function() {
            var openRoutes = [];
            openRoutes.push("");
            angular.forEach($route.routes, function(route, path) {
                if (route.publicAccess) {
                    openRoutes.push(path);
                }
            });
            $rootScope.$on('$locationChangeStart', function(event) {
                if (appContext.currentUser.isValid()) {
                    return;
                }

                var closed = (openRoutes.indexOf($location.path()) === -1);
                if (closed) {
                    event.preventDefault();
                    $location.path('/login');
                }
            });

            $rootScope.$on('$routeChangeSuccess', function(event, current) {
                headerService.setHeader(true);
                headerService.setMainMenu(true);

                if (current.$$route !== undefined) {
                    if (typeof($rootScope.sharedModel) === 'undefined') {
                        $rootScope.sharedModel = {};
                    }
                    $rootScope.sharedModel.title = current.$$route.title;
                    $translate(current.$$route.title).then(function(translation) {
                        $rootScope.sharedModel.title = translation;
                    });
                }
            });
        };

        setRouteEvents();
    });
}());
