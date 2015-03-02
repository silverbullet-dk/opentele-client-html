(function() {
    'use strict';

    var measurements = angular.module('opentele.controllers.measurements', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices'
    ]);

    measurements.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/perform_measurements', {
                title: 'PERFORM_MEASUREMENTS',
                templateUrl: 'areas/measurements/measurements.html'
            });
        }]);

    measurements.controller('MeasurementsCtrl', function($scope, $location, headerService,
                                                         nativeService, appContext, questionnaires) {
        headerService.setBack(false);

        $scope.showQuestionnaire = function(selected) {
            var questionnaireRef = $scope.model.questionnaires[selected];
            $scope.model.questionnaires[selected].marked = false;
            nativeService.clearRemindersForQuestionnaire(questionnaireRef.name);
            appContext.requestParams.set('selectedQuestionnaire', questionnaireRef);
            $location.path('/questionnaire');
        };

        var user = appContext.currentUser.get();
        $scope.model = {};

        questionnaires.listFor(user,
            function(data) {
                $scope.model = data;
                if (data.questionnaires.length === 1) {
                    $location.replace('/perform_measurements', '/menu');
                    $scope.showQuestionnaire(0);
                }

                var questionnairesToHighlight = nativeService.getQuestionnairesToHighlight();
                if (questionnairesToHighlight !== undefined &&
                    questionnairesToHighlight !== null &&
                    questionnairesToHighlight.length > 0) {
                    $scope.model.questionnaires = $scope.model.questionnaires.map(function(questionnaire) {
                        questionnaire.marked = questionnairesToHighlight.indexOf(questionnaire.name) > -1;
                        return questionnaire;
                    });
                }
            });
    });
}());
