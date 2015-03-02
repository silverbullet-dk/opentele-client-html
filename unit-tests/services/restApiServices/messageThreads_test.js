(function () {
    'use strict';

    describe('opentele.restApiServices.messageThreads service', function() {
        var httpBackend, restConfig, httpProvider;
        var messageThreads;

        beforeEach(module('opentele.restApiServices.messageThreads'));

        beforeEach(function() {
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost/";
            restConfig.loginUrl = "patient";

            module(function($provide) {
                $provide.value('restConfig', restConfig);
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($http) {
            httpProvider = $http;
        }));

        beforeEach(inject(function(_messageThreads_, $httpBackend) {
            messageThreads = _messageThreads_;
            httpBackend = $httpBackend;
        }));

        describe('list all recipients for user', function() {

            it('should not invoke callback when status is 401', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        messageThreads: "http://localhost/rest/messages/recipients"
                    }
                };
                httpBackend.whenGET(user.links.messages).respond(401);

                messageThreads.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(false);
            });

            it('should throw exception when user has no link to messages', function() {
                expect(function() {
                    messageThreads.listFor({});
                }).toThrow();
                expect(function() {
                    messageThreads.listFor({links: {}});
                }).toThrow();
            });

            it('should invoke success callback when response is valid', function() {
                var successCallbackInvoked = false;
                var user = {
                    links: {
                        messageThreads: "http://localhost/rest/messages/recipients"
                    }
                };
                httpBackend.whenGET(user.links.messages).respond([]);

                messageThreads.listFor(user,
                    function() {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(true);
            });

            it('should transform response to client object', function() {
                var user = {links: {messageThreads: "http://localhost/recipients"}};
                httpBackend.whenGET(user.links.messages).respond([
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
                ]);

                var data = {};
                messageThreads.listFor(user, function(response) {
                    data = response;
                });

                httpBackend.flush();

                expect(data.threads.length).toEqual(3);
                expect(data.threads[0].id).toEqual(6);
                expect(data.threads[0].name).toEqual("Obstetrisk Y, AUH, RM");
                expect(data.threads[0].links.messages).toEqual("http://localhost/rest/message/list/6");
                expect(data.threads[0].links.replyTo).toEqual("http://localhost/rest/message/list");
                expect(data.threads[0].links.markAsRead).toEqual("http://localhost/rest/message/markAsRead");

                expect(data.threads[1].id).toEqual(8);
                expect(data.threads[1].name).toEqual("TCN");
                expect(data.threads[1].links.messages).toEqual("http://localhost/rest/message/list/8");
                expect(data.threads[1].links.replyTo).toEqual("http://localhost/rest/message/list");
                expect(data.threads[1].links.markAsRead).toEqual("http://localhost/rest/message/markAsRead");

                expect(data.threads[2].id).toEqual(1);
                expect(data.threads[2].name).toEqual("Afdeling-B Test");
                expect(data.threads[2].links.messages).toEqual("http://localhost/rest/message/list/1");
                expect(data.threads[2].links.replyTo).toEqual("http://localhost/rest/message/list");
                expect(data.threads[2].links.markAsRead).toEqual("http://localhost/rest/message/markAsRead");
            });

        });

        describe('get specific thread', function() {
            var testThread = {
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
                        "isRead": true,
                        "sendDate": "2013-12-17T10:58:27.283+01:00",
                        "readDate":"2013-12-17T10:58:52.267+01:00"
                    }
                ]
            };

            it('should transform response to client object', function() {
                var threadRef = {
                    id: 1,
                    name: "Afdeling-B Test",
                    links: {
                        messages: "http://localhost/rest/message/list/1",
                        replyTo: "http://localhost/rest/message/list",
                        markAsRead: "http://localhost/rest/message/markAsRead"
                    }
                };

                var getUrl = threadRef.links.messages.slice(0,-2);
                httpBackend.whenGET(getUrl).respond(testThread);

                var data = {};
                messageThreads.get(threadRef, function(response) {
                    data = response;
                });
                httpBackend.flush();

                expect(data.messages[0].id).toEqual(252);
                expect(data.messages[0].title).toEqual("Hej Hej");
                expect(data.messages[0].text).toEqual("Test");
                expect(data.messages[0].to.type).toEqual("Patient");
                expect(data.messages[0].to.id).toEqual(11);
                expect(data.messages[0].to.name).toEqual("Nancy Ann Berggren");
                expect(data.messages[0].from.type).toEqual("Department");
                expect(data.messages[0].from.id).toEqual(1);
                expect(data.messages[0].from.name).toEqual("Afdeling-B Test");
                expect(data.messages[0].isRead).toEqual(true);
                expect(data.messages[0].sendDate).toEqual("2013-12-19T10:25:44.877+01:00");
                expect(data.messages[0].readDate).toEqual("2014-01-22T11:40:00.690+01:00");

                expect(data.messages[1].id).toEqual(251);
                expect(data.messages[1].title).toEqual("sdf");
                expect(data.messages[1].text).toEqual("");
                expect(data.messages[1].to.type).toEqual("Patient");
                expect(data.messages[1].to.id).toEqual(11);
                expect(data.messages[1].to.name).toEqual("Nancy Ann Berggren");
                expect(data.messages[1].from.type).toEqual("Department");
                expect(data.messages[1].from.id).toEqual(1);
                expect(data.messages[1].from.name).toEqual("Afdeling-B Test");
                expect(data.messages[1].isRead).toEqual(true);
                expect(data.messages[1].sendDate).toEqual("2013-12-17T10:58:27.283+01:00");
                expect(data.messages[1].readDate).toEqual("2013-12-17T10:58:52.267+01:00");
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function() {
                    messageThreads.get({}, function(r) {});
                };
                var wrapperNoLink = function() {
                    messageThreads.get({links: {}}, function(r) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });
        });

        describe('mark as read', function() {
            it('should format request and send to server', function() {
                var threadRef = {
                    id: 1,
                    name: "Afdeling-B Test",
                    links: {
                        messages: "http://localhost/rest/message/list/1",
                        replyTo: "http://localhost/rest/message/list",
                        markAsRead: "http://localhost/rest/message/markAsRead"
                    }
                };

                var messages = [
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
                        "isRead": false,
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
                        "readDate": "2013-12-17T10:58:52.267+01:00"
                    }
                ];

                var actualData;
                httpBackend.whenPOST("http://localhost/rest/message/markAsRead", function(data) {
                    actualData = JSON.parse(data);
                    console.log(actualData);
                    return true;
                }).respond(200);

                messageThreads.markAsRead(threadRef, messages, function() {});

                httpBackend.flush();

                expect(actualData).toBeDefined();
                expect(actualData[0]).toEqual(252);
                expect(actualData[1]).toEqual(251);
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function() {
                    messageThreads.markAsRead({}, {}, function(r) {});
                };
                var wrapperNoLink = function() {
                    messageThreads.markAsRead({links: {}}, {}, function(r) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });

            it('should invoke success callback', function() {
                var threadRef = {
                    id: 1,
                    name: "Afdeling-B Test",
                    links: {
                        messages: "http://localhost/rest/message/list/1",
                        replyTo: "http://localhost/rest/message/list",
                        markAsRead: "http://localhost/rest/message/markAsRead"
                    }
                };

                var messages = [
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
                        "isRead": false,
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
                        "readDate": "2013-12-17T10:58:52.267+01:00"
                    }
                ];

                httpBackend.whenPOST("http://localhost/rest/message/markAsRead").respond(200);

                var successInvoked = false;
                messageThreads.markAsRead(threadRef, messages,
                    function() {
                        successInvoked = true;
                    });

                httpBackend.flush();
                expect(successInvoked).toBe(true);
            });
        });

        describe('send new message', function() {
            it('should format request and send to server', function() {
                var threadRef = {
                    id: 1,
                    name: "Afdeling-B Test",
                    links: {
                        messages: "http://localhost/rest/message/list/1",
                        replyTo: "http://localhost/rest/message/list"
                    }
                };

                var message = {
                    "department": 1,
                    "title": "Ny besked",
                    "text": "Med nyt indhold"
                };

                var actualData;
                httpBackend.whenPOST("http://localhost/rest/message/list", function(data) {
                    actualData = JSON.parse(data);
                    return true;
                }).respond(200);

                messageThreads.post(threadRef, message, function() {});

                httpBackend.flush();

                expect(actualData).toBeDefined();
                expect(actualData.department).toEqual(1);
                expect(actualData.title).toEqual("Ny besked");
                expect(actualData.text).toEqual("Med nyt indhold");
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function() {
                    messageThreads.replyTo({}, {}, function(r) {});
                };
                var wrapperNoLink = function() {
                    messageThreads.replyTo({links: {}}, {}, function(r) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });

            it('should invoke success callback', function() {
                var threadRef = {
                    id: 1,
                    name: "Afdeling-B Test",
                    links: {
                        messages: "http://localhost/rest/message/list/1",
                        replyTo: "http://localhost/rest/message/list"
                    }
                };

                var message = {
                    "department": 1,
                    "title": "Ny besked",
                    "text": "Med nyt indhold"
                };

                httpBackend.whenPOST("http://localhost/rest/message/list").respond(200);

                var successInvoked = false;
                messageThreads.post(threadRef, message,
                    function() {
                        successInvoked = true;
                    });

                httpBackend.flush();
                expect(successInvoked).toBe(true);
            });
        });

    });
}());
