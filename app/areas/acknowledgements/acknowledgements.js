(function() {
    'use strict';

    var acknowledgements = angular.module('opentele.controllers.acknowledgements', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices'
    ]);

    acknowledgements.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/acknowledgements', {
                title: 'ACKNOWLEDGEMENTS_TITLE',
                templateUrl: 'areas/acknowledgements/acknowledgements.html'
            });
        }]);

    acknowledgements.controller('AcknowledgementsCtrl', function($scope, $location,
                                                 headerService, appContext,
                                                 acknowledgements) {
        $scope.model = {};
        var user = appContext.currentUser.get();

        acknowledgements.listFor(user, function(acknowledgements) {

            acknowledgements.acknowledgements.sort(function(m1, m2) {
                return m1.id - m2.id; // order by ID -> order by creation date.
            });

            $scope.model = acknowledgements;
        });

    });
}());
