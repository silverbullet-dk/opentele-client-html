(function () {
    'use strict';

    describe('opentele.controllers.messages', function () {
        var controller, scope, location, appContext, messageThreads;
        var restServiceResult;

        beforeEach(module('opentele.controllers.messages'));

        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function ($provide) {
            restServiceResult = {
                threads: [
                    {
                        "id": 6,
                        "name": "Obstetrisk Y, AUH, RM"
                    },
                    {
                        "id": 8,
                        "name": "TCN"
                    },
                    {
                        "id": 1,
                        "name": "Afdeling-B Test"
                    }
                ]
            };
            messageThreads = {
                listFor: function (appContext, onSuccess) {
                    onSuccess(restServiceResult);
                }
            };

            $provide.value('messageThreads', messageThreads);
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
                    messages: "http://localhost/rest/messages/recipients"
                }});
        }));

        var runController = function() {
            controller('MessagesCtrl', {
                '$scope': scope,
                '$location': location,
                'appContext': appContext,
                'messageThreads': messageThreads
            });
        };

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should get all recipients for user', function() {
            runController();

            expect(scope.model.threads.length).toEqual(3);
            expect(scope.model).toEqual(restServiceResult);
        });

        it('should open threads when clicked', function() {
            runController();

            scope.showThread(1);

            expect(location.path()).toEqual('/thread');
            expect(appContext.requestParams.getAndClear('selectedThread')).toEqual(restServiceResult.threads[1]);
        });

        it('should automatically redirect to thread if list only contains one', function () {
            restServiceResult = {
                threads: [
                    {
                        "id": 6,
                        "name": "Obstetrisk Y, AUH, RM"
                    }
                ]
            };
            runController();

            expect(location.path()).toEqual('/thread');
        });
    });
}());
