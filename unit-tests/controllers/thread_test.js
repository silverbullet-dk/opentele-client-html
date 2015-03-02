(function () {
    'use strict';

    describe('opentele.controllers.thread', function () {
        var controller, scope, window, location, appContext, messageThreads;
        var restServiceResult;

        beforeEach(module('opentele.controllers.thread'));

        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function ($provide) {
            restServiceResult = {
                unread: 0,
                messages: [
                    {
                        "id": 252,
                        "title": "Hej Hej",
                        "text": "Test",
                        "to": {
                            "type": "Patient",
                            "id": 11,
                            "name": "Nancy Ann Berggren"
                        },
                        "from": {
                            "type": "Department",
                            "id": 1,
                            "name": "Afdeling-B Test"
                        },
                        "isRead": true,
                        "sendDate": "2013-12-19T10:25:44.877+01:00",
                        "readDate": "2014-01-22T11:40:00.690+01:00"
                    },
                    {
                        "id": 251,
                        "title": "sdf",
                        "text": "",
                        "to": {
                            "type": "Patient",
                            "id": 11,
                            "name": "Nancy Ann Berggren"
                        },
                        "from": {
                            "type": "Department",
                            "id": 1,
                            "name": "Afdeling-B Test"
                        },
                        "isRead": false,
                        "sendDate": "2013-12-17T10:58:27.283+01:00",
                        "readDate":"2013-12-17T10:58:52.267+01:00"
                    }
                ]
            };
            messageThreads = {
                get: function (threadRef, onSuccess) {
                    onSuccess(restServiceResult);
                },
                markAsRead: function (threadRef, messages, onSuccess, onError) {
                    onSuccess();
                }
            };

            $provide.value('messageThreads', messageThreads);
        }));

        beforeEach(inject(function ($rootScope, $window, $location, $controller, _appContext_) {
            scope = $rootScope.$new();
            location = $location;
            window = $window;
            controller = $controller;
            appContext = _appContext_;

            appContext.requestParams.set('selectedThread', {
                "id": 1,
                "name": "Afdeling-B Test",
                links: {
                    messages: "http://localhost/rest/messages/1",
                    replyTo: "http://localhost/rest/messages"
                }
            });
        }));

        var runController = function() {
            controller('ThreadCtrl', {
                '$scope': scope,
                '$location': location,
                '$window': window,
                'appContext': appContext,
                'messageThreads': messageThreads
            });
        };

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should set current thread correctly', function() {
            runController();

            expect(scope.model.thread.id).toEqual(1);
            expect(scope.model.thread.name).toEqual("Afdeling-B Test");
        });

        it('should navigate to /messages when pressing back click inside threads',
            inject(function($timeout) {
                runController();

                window.history.back = function() {
                    location.path('/messages');
                };

                scope.$parent.$broadcast('backClick');
                $timeout(function() {
                    expect(location.path()).toEqual("/messages");
                }, 200);
                $timeout.flush();
            }));

        it('should get all messages for user', function() {
            runController();

            expect(scope.model.messages.length).toEqual(2);
            expect(scope.model.messages).toEqual(restServiceResult.messages);
        });

        it('should navigate to /newMessage when pressing new message button', function() {
            runController();

            scope.newMessage();
            expect(location.path()).toEqual('/newMessage');
        });

    });
}());
