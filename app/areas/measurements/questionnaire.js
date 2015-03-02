(function() {
    'use strict';

    var questionnaire = angular.module('opentele.controllers.questionnaire', [
        'ngRoute',
        'ngSanitize',
        'opentele.services',
        'opentele.translations'
    ]);

    questionnaire.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/questionnaire', {
                title: 'QUESTIONNAIRE',
                templateUrl: 'areas/measurements/questionnaire.html'
            });
    }]);

    questionnaire.controller('QuestionnaireCtrl', function($scope, $window, $location,
        $translate, $templateCache, appContext, nodesParser,
        headerService, questionnaires) {

        if (!appContext.requestParams.containsKey('selectedQuestionnaire')) {
            $location.path('/menu');
            return;
        }

        headerService.setBack(true);
        $scope.model = {};
        $scope.nodeHistory = [];
        $scope.outputModel = {};
        var representation = {};
        var nodes = {};
        var currentQuestionnaire = {};

        var refreshModel = function(nextNodeId, nodesParser, nodeMap) {
            representation = nodesParser.parse(nextNodeId, nodeMap, $scope.outputModel);
            setInitialNodeState($scope);
            if (representation.isEndNode === true) {
                var questionnaireState = {
                    outputs: collectOutputs($scope),
                    questionnaire: currentQuestionnaire,
                    questionnaireRef: questionnaireRef,
                    nodeHistory: $scope.nodeHistory
                };
                appContext.requestParams.set('questionnaireState', questionnaireState);
                $location.path('/send_reply');
                return;
            }
            renderNode($scope, $translate, $templateCache, nodesParser, representation, nodeMap);
        };

        var refreshFromHistory = function(scope, location, nodesParser, nodeMap) {
            var nodeHistory = scope.nodeHistory;
            nodeHistory.pop();
            if (nodeHistory.length === 0) {
                $window.history.back();
            } else {
                var previousNodeId = nodeHistory[nodeHistory.length - 1];
                refreshModel(previousNodeId, nodesParser, nodeMap);
            }
        };

        $scope.nextNode = function(node, nodesParser, nodeMap) {
            $scope.nodeHistory.push(node);
            refreshModel(node, nodesParser, nodeMap);
        };

        $scope.$on('backClick', function() {
            refreshFromHistory($scope, $location, nodesParser, nodes.nodeMap);
        });

        var questionnaireRef = appContext.requestParams.getAndClear('selectedQuestionnaire');
        questionnaires.get(questionnaireRef, function(responseData) {
            currentQuestionnaire = responseData;
            nodes = toNodeMap(currentQuestionnaire);
            var nodeMap = nodes.nodeMap;
            nodesParser.validate(nodeMap);

            if (appContext.requestParams.containsKey('nodeHistory')) {
                $scope.nodeHistory = appContext.requestParams.getAndClear('nodeHistory');
                refreshFromHistory($scope, $location, nodesParser, nodes.nodeMap);
                return;
            }
            $scope.nextNode(nodes.startNode, nodesParser, nodeMap);
        });
    });

    var exists = function(obj) {
        return typeof(obj) !== 'undefined' && obj !== null;
    };

    var setInitialNodeState = function(scope) {
        forEachButtonDo(function(button) {
            scope.model[button + 'Show'] = false;
            scope.model[button + 'Text'] = '';
            scope.model[button + 'NextNodeId'] = '';
            scope.model[button + 'Validate'] = function() {
                return true;
            };
            scope.model[button + 'Click'] = function() {};
        });
        scope.model.questionHtml = "";
        scope.nodeModel = {};
    };

    var renderNode = function(scope, translate, templateCache, nodesParser, representation, nodeMap) {
        scope.model.questionHtml = representation.nodeTemplate;
        scope.nodeModel = representation.nodeModel;

        var wrapValidate = function(validate) {
            return function() {
                if (exists(validate)) {
                    return validate(scope);
                }
                return true;
            };
        };

        var clickButton = function(button, representation) {
            var clickAction = representation.clickAction;
            var validate = representation.validate;
            return function() {
                if (!exists(validate) ||
                    (exists(validate) && validate(scope))) {
                    if (clickAction) {
                        clickAction(scope);
                    }
                    var nextNodeId = scope.model[button + 'NextNodeId'];
                    scope.nextNode(nextNodeId, nodesParser, nodeMap);
                }
            };
        };

        var updateButtonModel = function(button, representation) {
            scope.model[button + 'Show'] = true;
            scope.model[button + 'Text'] = translate.instant(representation[button].text);
            scope.model[button + 'NextNodeId'] = representation[button].nextNodeId;
            scope.model[button + 'Validate'] = wrapValidate(representation[button].validate);
            scope.model[button + 'Click'] = clickButton(button, representation[button]);
        };

        forEachButtonDo(function(button) {
            if (button in representation) {
                updateButtonModel(button, representation);
            }
        });
    };

    var forEachButtonDo = function(action) {
        var buttons = ['leftButton', 'centerButton', 'rightButton'];
        for (var i = 0; i < buttons.length; i++) {
            action(buttons[i]);
        }
    };

    var collectOutputs = function(scope) {
        var outputs = [];
        for (var nodeOutput in scope.outputModel) {
            if (scope.outputModel.hasOwnProperty(nodeOutput)) {
                outputs.push(scope.outputModel[nodeOutput]);
            }
        }
        return outputs;
    };

    var toNodeMap = function(rawJson) {
        var nodeMap = {};
        for (var i = 0; i < rawJson.nodes.length; i++) {
            var node = rawJson.nodes[i];
            nodeMap[node[getFirstKeyFromLiteral(node)].nodeName] = node;
        }

        return {
            startNode: rawJson.startNode,
            nodeMap: nodeMap
        };
    };

    var getFirstKeyFromLiteral = function(literal) {
        for (var key in literal) {
            if (literal.hasOwnProperty(key)) {
                return key;
            }
        }
    };
}());
