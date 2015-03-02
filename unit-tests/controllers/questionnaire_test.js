(function() {
    'use strict';

    describe('opentele.controllers.questionnaire module', function() {

        beforeEach(module('opentele.controllers.questionnaire'));

        describe('QuestionnaireCtrl', function() {
            var scope, window, location, nodesParser, appContext, questionnairesRestClient, runController;

            beforeEach(module(function($provide) {
                var headerService = {
                    setHeader: function(value) {},
                    getHeader: function() {
                        return true;
                    },
                    setBack: function(value) {},
                    getBack: function() {
                        return true;
                    },
                    setMainMenu: function(value) {},
                    getMainMenu: function() {
                        return true;
                    }
                };

                questionnairesRestClient = {
                    get: function(id, callback) {
                        callback({
                            "name": "Blodsukker (manuel)",
                            "id": 27,
                            "startNode": "157",
                            "endNode": "159",
                            "nodes": [
                                {
                                    "IONode": {
                                        "nodeName": "157",
                                        "elements": [
                                            {
                                                "TextViewElement": {
                                                    "text": "Time to measure blood sugar!"
                                                }
                                        },
                                            {
                                                "ButtonElement": {
                                                    "text": "Næste",
                                                    "gravity": "center",
                                                    "next": "158"
                                                }
                                        }
                                    ]
                                    }
                                },
                                {
                                    "BloodSugarManualDeviceNode": {
                                        "nodeName": "158",
                                        "next": "ANSEV_159_D158",
                                        "nextFail": "AN_158_CANCEL",
                                        "text": "Blodsukker",
                                        "bloodSugarMeasurements": {
                                            "name": "158.BS#BLOODSUGARMEASUREMENTS",
                                            "type": "Integer"
                                        },
                                        "deviceId": {
                                            "name": "158.BS#DEVICE_ID",
                                            "type": "String"
                                        }
                                    }
                                },
                                {
                                    "EndNode": {
                                        "nodeName": "159"
                                    }
                                }
                            ],
                            "output": []
                        });
                    }
                };

                $provide.value('headerService', headerService);
                $provide.value('questionnaires', questionnairesRestClient);
            }));

            module('opentele.stateServices');

            beforeEach(inject(function($rootScope, $controller, $window, $location,
                $translate, $templateCache, _appContext_, _nodesParser_, _headerService_, _questionnaires_) {
                nodesParser = _nodesParser_;
                appContext = _appContext_;
                scope = $rootScope.$new();
                window = $window;
                $rootScope.sharedModel = {};
                location = $location;
                $location.search('id', 'test');

                appContext.requestParams.set('selectedQuestionnaire', {
                    links: {
                        questionnaire: 'http://localhost/questionnaire/1'
                    }
                });

                $templateCache.get = jasmine.createSpy().andReturn("fake html");

                runController = function() {
                    $controller('QuestionnaireCtrl', {
                        '$scope': scope,
                        '$window': window,
                        '$location': location,
                        '$translate': $translate,
                        'appContext': _appContext_,
                        'nodesParser': nodesParser,
                        'headerService': _headerService_,
                        'questionnaires': _questionnaires_
                    });
                };
            }));

            describe('preconditions', function() {
                it('should redirect back to menu page if no questionnaire has been selected', function() {
                    appContext.requestParams.getAndClear('selectedQuestionnaire'); // clear it...

                    runController();

                    expect(location.path()).toBe('/menu');
                });
            });

            describe('Back button', function() {
                beforeEach(function() {
                    runController();
                });

                it('should have a nodeHistory', inject(function() {
                    expect(scope.nodeHistory).toBeDefined();
                }));

                it('nodeHistory should have length one', inject(function() {
                    expect(scope.nodeHistory.length).toEqual(1);
                }));

                it('nodeHistory should have entry 157', inject(function() {
                    expect(scope.nodeHistory[0]).toEqual('157');
                }));

                it('should navigate to /perform_measurements when pressing back click at first node',
                    inject(function($timeout) {
                        window.history.back = function() {
                            location.path('/perform_measurements');
                        };

                        scope.$parent.$broadcast('backClick');
                        $timeout(function() {
                            expect(location.path()).toEqual("/perform_measurements");
                        }, 200);
                        $timeout.flush();
                    }));

                it('should push a new node on history when pressing next', inject(function() {
                    scope.model.centerButtonClick();
                    expect(scope.nodeHistory.length).toEqual(2);
                }));

                it('next node should be 158', inject(function() {
                    scope.model.centerButtonClick();
                    expect(scope.nodeHistory[1]).toEqual('158');
                }));

                it('should navigate to node 157 when pressing back click at node 1588', function() {
                    scope.model.centerButtonClick();
                    expect(scope.nodeHistory[1]).toEqual('158');
                    scope.$parent.$broadcast('backClick');
                    expect(scope.nodeHistory[0]).toEqual('157');
                });
            });

            describe('GUI side effects', function() {
                beforeEach(function() {
                    runController();
                });

                it('should have hidden left button', inject(function() {
                    expect(scope.model.leftButtonShow).toEqual(false);
                }));

                it('should have visible center button', inject(function() {
                    expect(scope.model.centerButtonShow).toEqual(true);
                }));

                it('should have correct question html set-up', inject(function() {
                    expect(scope.model.questionHtml).toEqual('fake html');
                }));

                it('should have hidden right button', inject(function() {
                    expect(scope.model.rightButtonShow).toEqual(false);
                }));

            });

            describe('invoke click actions', function() {
                beforeEach(function() {
                    runController();
                });

                it('should call clickAction when pressing Next', function() {
                    var clicked = false;
                    nodesParser.parse = function() {
                        var representation = {
                            html: ''
                        };

                        representation.centerButton = {
                            text: "Next",
                            nextNodeId: '159',
                            clickAction: function() {
                                clicked = true;
                            }
                        };
                        return representation;
                    };

                    scope.model.centerButtonClick(); // extra click -> first clickButton already created before mocking parse
                    scope.model.centerButtonClick();
                    expect(clicked).toEqual(true);
                });
            });

            describe('collect and send output', function() {
                beforeEach(function() {
                    runController();
                });

                beforeEach(function() {
                    nodesParser.parse = function(currentNodeId, nodeMap, outputModel) {
                        var representation = {
                            isEndNode: true
                        };

                        outputModel.TEST_OUTPUT = {
                            name: 'test name',
                            value: 1234
                        };

                        return representation;
                    };

                    scope.model.centerButtonClick(); // extra click -> first clickButton already created before mocking parse method
                });

                it('should redirect to send reply page when end node is reached', function () {
                    scope.model.rightButtonClick();

                    expect(location.path()).toMatch(/\/send_reply/);
                });

                it('should transfer state to send reply page when end node is reached', function () {
                    scope.model.rightButtonClick();

                    expect(appContext.requestParams.containsKey('questionnaireState')).toBeTruthy();
                    var state = appContext.requestParams.getAndClear('questionnaireState');
                    expect(state.outputs).toBeDefined();
                    expect(state.questionnaire).toBeDefined();
                    expect(state.questionnaireRef).toBeDefined();
                    expect(state.nodeHistory).toBeDefined();
                });

                it('should collect output when end node is reached', function() {
                    scope.model.rightButtonClick();

                    var state = appContext.requestParams.getAndClear('questionnaireState');
                    expect(state.outputs).not.toBe(null);
                    expect(state.outputs.length).toBe(1);
                    expect(state.outputs[0].name).toBe('test name');
                    expect(state.outputs[0].value).toBe(1234);
                });
            });
        });
    });
})();
