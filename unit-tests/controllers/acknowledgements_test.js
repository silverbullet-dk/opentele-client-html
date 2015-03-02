(function () {
    'use strict';

    describe('opentele.controllers.acknowledgements', function () {
        var controller, scope, location, appContext, acknowledgements;
        var restServiceResult;

        beforeEach(module('opentele.controllers.acknowledgements'));

        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function ($provide) {
            restServiceResult = {
                "acknowledgements": [
                    {
                        "id": 205,
                        "message": "Dine data fra spørgeskemaet Hæmoglobin indhold i blod " +
                            "indsendt d. 13-10-2014 kl. 10:29 er set og godkendt d. " +
                            "15-11-2014 kl. 16:39."
                    },
                    {
                        "id": 204,
                        "message": "Dine data fra spørgeskemaet Lunger indhold i blod " +
                            "indsendt d. 27-03-2012 kl. 09:54 er set og godkendt d. " +
                            "06-07-2013 kl. 15:21."
                    },
                    {
                        "id": 201,
                        "message": "Dine data fra spørgeskemaet Blodsukker indsendt d. " +
                            "05-01-2010 kl. 15:10 er set og godkendt d. 09-02-2014 kl." +
                            " 21:15."
                    }
                ]
            };
            acknowledgements = {
                listFor: function(user, onSuccess) {
                    onSuccess(restServiceResult);
                }
            };

            $provide.value('acknowledgements', acknowledgements);
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
                    acknowledgements: "http://localhost/rest/questionnaire/acknowledgements"
                }});
        }));

        var runController = function() {
            controller('AcknowledgementsCtrl', {
                '$scope': scope,
                '$location': location,
                'appContext': appContext,
                'acknowledgements': acknowledgements
            });
        };

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should get all acknowledgements for user', function() {
            runController();
            expect(scope.model.acknowledgements.length).toEqual(3);
            expect(scope.model).toEqual(restServiceResult);
        });

    });
}());
