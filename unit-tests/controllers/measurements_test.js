(function () {
    'use strict';

    describe('opentele.controllers.measurements', function () {
        var controller, scope, location, appContext, questionnaires, nativeService;
        var restServiceResult;

        beforeEach(module('opentele.controllers.measurements'));

        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function ($provide) {
            restServiceResult = { questionnaires: [
                {
                    name: "Blodsukker (manuel)",
                    version: "1.0",
                    links: {
                        questionnaire: "http://localhost/rest/download/27"
                    }
                },
                {
                    name: "Blodtryk (manuel)",
                    version: "0.1",
                    links: {
                        questionnaire: "http://localhost/rest/download/42"
                    }
                }
            ]};
            questionnaires = {
                listFor: function (appContext, onSuccess) {
                    onSuccess(restServiceResult);
                }
            };
            nativeService = {
                getQuestionnairesToHighlight: function() {
                    return ["Blodtryk (manuel)"];
                },
                clearRemindersForQuestionnaire: function(questionnaireName) { }
            };

            $provide.value('nativeService', nativeService);
            $provide.value('questionnaires', questionnaires);
        }));

        beforeEach(inject(function ($rootScope, $location, $controller, _appContext_) {
            scope = $rootScope.$new();
            location = $location;
            controller = $controller;
            appContext = _appContext_;

            appContext.currentUser.set({
                firstName: "first name",
                lastName: "last name",
                links: {
                    questionnaires: "http://localhost/rest/listing"
                }});
        }));

        var runController = function() {
            controller('MeasurementsCtrl', {
                '$scope': scope,
                '$location': location,
                'appContext': appContext,
                'questionnaires': questionnaires
            });
        };

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should get all questionnaires for user (and properly marked)', function() {
            runController();

            expect(scope.model.questionnaires.length).toEqual(2);
            expect(scope.model).toEqual(restServiceResult);
            expect(scope.model.questionnaires[0].marked).toEqual(false);
            expect(scope.model.questionnaires[1].marked).toBeDefined();
            expect(scope.model.questionnaires[1].marked).toEqual(true);
        });

        it('should open questionnaire when clicked', function() {
            runController();

            scope.showQuestionnaire(1);
            expect(location.path()).toEqual('/questionnaire');
            expect(appContext.requestParams.getAndClear('selectedQuestionnaire')).toEqual(restServiceResult.questionnaires[1]);
        });

        it('should automatically redirect to questionnaire if list only contains one', function () {
            restServiceResult = { questionnaires: [
                {
                    name: "Blodsukker (manuel)",
                    version: "1.0",
                    links: {
                        questionnaire: "http://localhost/rest/download/27"
                    }
                }
            ]};
            runController();

            expect(location.path()).toEqual('/questionnaire');
        });
    });
}());
