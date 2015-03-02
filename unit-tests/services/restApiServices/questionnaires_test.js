(function () {
    'use strict';

    describe('opentele.restApiServices.questionnaires service', function () {
        var httpBackend, restConfig, httpProvider;
        var questionnaires;

        beforeEach(module('opentele.restApiServices.questionnaires'));

        beforeEach(function () {
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost/";
            restConfig.loginUrl = "patient/login";

            module(function ($provide) {
                $provide.value('restConfig', restConfig);
            });
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function ($http) {
            httpProvider = $http;
        }));


        beforeEach(inject(function (_questionnaires_, $httpBackend) {
            questionnaires = _questionnaires_;
            httpBackend = $httpBackend;
        }));

        describe('list all questionnaires for user', function () {

            it('should not invoke callback when status is 401', function () {
                var successCallbackInvoked = false;
                var user = {links: {questionnaires: "http://localhost/listing"}};
                httpBackend.whenGET(user.links.questionnaires).respond(401);

                questionnaires.listFor(user,
                    function () {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(false);
            });

            it('should throw exception when user has no link to questionnaires', function () {
                expect(function () {
                    questionnaires.listFor({});
                }).toThrow();
                expect(function () {
                    questionnaires.listFor({links: {}});
                }).toThrow();
            });

            it('should invoke success callback when response is valid', function () {
                var successCallbackInvoked = false;
                var user = {links: {questionnaires: "http://localhost/listing"}};
                httpBackend.whenGET(user.links.questionnaires).respond({questionnaires: []});

                questionnaires.listFor(user,
                    function () {
                        successCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(true);
            });

            it('should transform response to client object', function () {
                var user = {links: {questionnaires: "http://localhost/listing"}};
                httpBackend.whenGET(user.links.questionnaires).respond({questionnaires: [
                    {
                        id: 123,
                        schedule: null,
                        name: "blodsukker",
                        version: "1.0"
                    },
                    {
                        id: 456,
                        schedule: null,
                        name: "blodtryk",
                        version: "0.1"
                    }
                ]});

                var data = {};
                questionnaires.listFor(user, function (response) {
                    data = response;
                });

                httpBackend.flush();
                expect(data.questionnaires.length).toEqual(2);
                expect(data.questionnaires[0].name).toEqual("blodsukker");
                expect(data.questionnaires[0].version).toEqual("1.0");
                expect(data.questionnaires[0].id).toEqual(123);
                expect(data.questionnaires[0].links.questionnaire).toMatch(/\/123/);
                expect(data.questionnaires[1].name).toEqual("blodtryk");
                expect(data.questionnaires[1].version).toEqual("0.1");
                expect(data.questionnaires[1].id).toEqual(456);
                expect(data.questionnaires[1].links.questionnaire).toMatch(/\/456/);
            });
        });

        describe('get specific questionnaire', function() {
            var testQuestionnaire = {"name": "Blodsukker (manuel)", "id": 27, "startNode": "157", "endNode": "159", "nodes": [
                    {"IONode": {"nodeName": "157", "elements": [
                        {"TextViewElement": {"text": "Så skal der måles blodsukker!"}},
                        {"ButtonElement": {"text": "Næste", "gravity": "center", "next": "158"}}
                    ]}},
                    {"EndNode": {"nodeName": "159"}}
                ], "output": [
                    {"name": "158.BS##CANCEL", "type": "Boolean"},
                    {"name": "158.BS#DEVICE_ID", "type": "String"},
                    {"name": "158.BS##SEVERITY", "type": "String"},
                    {"name": "158.BS#BLOODSUGARMEASUREMENTS", "type": "Integer"}
                ]
            };

            it('should transform response to client object', function() {
                var questionnaireRef = {version: "0.1", links: {questionnaire: 'http://localhost/questionnaires/download/27'}};
                httpBackend.whenGET(questionnaireRef.links.questionnaire).respond(testQuestionnaire);

                var data = {};
                questionnaires.get(questionnaireRef, function(response) {
                    data = response;
                });

                httpBackend.flush();
                expect(data.name).toBe('Blodsukker (manuel)');
                expect(data.startNode).toBe('157');
                expect(data.nodes.length).toBe(2);
                expect(data.version).toBeDefined();
                expect(data.version).toBe("0.1");
                expect(data.links).toBeDefined();
                expect(data.links.questionnaireResult).toMatch(/questionnaire\/listing/);
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function () {
                    questionnaires.get({}, function(r) {});
                };
                var wrapperNoLink = function () {
                    questionnaires.get({links: {}}, function(r) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });
        });

        describe('reply to questionnaire', function() {
            it('should format request and send to server', function() {
                var questionnaire = {
                    name: 'blodsukker',
                    version: '0.1',
                    id: 27,
                    links: {
                        questionnaireResult: 'http://localhost/rest/questionnaire/listing'
                    }
                };
                var outputs = [{
                    name: "SOME_OUTPUT",
                    value: "hello there",
                    type: "String"
                }];

                var actualData;
                httpBackend.whenPOST(/.*\/questionnaire\/listing/, function(data) {
                    actualData = JSON.parse(data);
                    return true;
                }).respond(200);

                questionnaires.replyTo(questionnaire, outputs, function() {});

                httpBackend.flush();
                expect(actualData).toBeDefined();
                expect(actualData.name).toBe(questionnaire.name);
                expect(actualData.QuestionnaireId).toBe(questionnaire.id);
                expect(actualData.version).toBe(questionnaire.version);
                expect(actualData.date).toBeDefined();
                expect(actualData.output).toEqual(outputs);
            });

            it('should throw exception if links is not defined', function() {
                var wrapperEmpty = function () {
                    questionnaires.replyTo({}, {}, function(r) {});
                };
                var wrapperNoLink = function () {
                    questionnaires.replyTo({links: {}}, {}, function(r) {});
                };
                expect(wrapperEmpty).toThrow();
                expect(wrapperNoLink).toThrow();
            });

            it('should invoke success callback', function() {
                var questionnaire = {
                    name: 'blodsukker',
                    version: '0.1',
                    id: 27,
                    links: {
                        questionnaireResult: 'http://localhost/rest/upload'
                    }
                };
                var outputs = [{
                    name: "SOME_OUTPUT",
                    value: "hello there",
                    type: "String"
                }];
                httpBackend.whenPOST(/.*\/upload/).respond(200);

                var successInvoked = false;
                questionnaires.replyTo(questionnaire, outputs, function() {successInvoked = true;});

                httpBackend.flush();
                expect(successInvoked).toBe(true);
            });
        });
    });
}());
