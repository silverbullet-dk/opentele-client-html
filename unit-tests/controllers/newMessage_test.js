(function () {
    'use strict';

    describe('opentele.controllers.newMessage', function () {
        var controller, scope, http, window, location, translate, appContext, messageThreads;

        beforeEach(module('opentele.controllers.newMessage'));

        beforeEach(module('opentele.stateServices'));
        beforeEach(module('opentele.translations'));

        beforeEach(module(function ($provide) {

            messageThreads = {
                post: function (threadRef, message, onSuccess, onError) {
                    scope.restResult = {
                        threadRef: threadRef,
                        message: message
                    };
                    onSuccess(true);
                }
            };

            $provide.value('messageThreads', messageThreads);
        }));

        beforeEach(inject(function ($rootScope, $window, $location, $http, $translate, $controller, _appContext_) {
            scope = $rootScope.$new();
            window = $window;
            location = $location;
            http = $http;
            translate = $translate;
            controller = $controller;
            appContext = _appContext_;

            appContext.requestParams.set('selectedThread', {
                "id": 1,
                "name": "Afdeling-B Test",
                "links": {
                    messages: "http://localhost/rest/messages/1",
                    replyTo: "http://localhost/rest/messages"
                }
            });
        }));

        var runController = function() {
            controller('NewMessageCtrl', {
                '$scope': scope,
                '$window': window,
                '$location': location,
                '$http': http,
                '$translate': translate,
                'appContext': appContext,
                'messageThreads': messageThreads
            });
        };

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });

        it('should set current recipient correctly', function() {
            runController();

            expect(scope.model.thread.id).toEqual(1);
            expect(scope.model.thread.links.replyTo).toEqual("http://localhost/rest/messages");
        });

        it('should navigate to /thread when pressing back click inside new message',
            inject(function($timeout) {
                runController();
                window.history.back = function() {
                    location.path('/thread');
                };

                scope.$parent.$broadcast('backClick');
                $timeout(function() {
                    expect(location.path()).toEqual('/thread');
                    expect(scope.model.thread.id).toEqual(1);
                    expect(scope.model.thread.name).toEqual("Afdeling-B Test");
                }, 200);
                $timeout.flush();
            }));

        it('should successfully post a new message', function() {
            runController();

            scope.model.message = "Some text";
            scope.submit();

            expect(location.path()).toEqual('/thread');
            expect(scope.restResult.threadRef.links.replyTo).toEqual('http://localhost/rest/messages');
            expect(scope.restResult.message).toEqual({
                "department": 1,
                "title": "",
                "text": "Some text"
            });

        });

    });
}());
