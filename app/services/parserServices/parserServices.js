(function () {
    'use strict';

    var parserServices = angular.module('opentele.parserServices', [
        'opentele.parserServices.utils',
        'opentele.parserServices.haemoglobinDeviceNodeParser',
        'opentele.parserServices.bloodSugarManualDeviceNodeParser',
        'opentele.parserServices.crpNodeParser',
        'opentele.parserServices.ioNodeParser',
        'opentele.parserServices.assignmentNodeParser',
        'opentele.parserServices.endNodeParser',
        'opentele.parserServices.decisionNodeParser',
        'opentele.parserServices.temperatureDeviceNodeParser',
        'opentele.parserServices.urineDeviceNodeParser',
        'opentele.parserServices.glucoseUrineDeviceNodeParser',
        'opentele.parserServices.delayNodeParser',
        'opentele.parserServices.lungMonitorDeviceNodeParser',
        'opentele.exceptionHandler'
    ]);

    parserServices.service('nodesParser', function ($injector, parserUtils, errorCodes) {

        var parser = {
            parse: function (currentNodeId, nodeMap, outputModel) {
                return parseNode(currentNodeId, nodeMap, outputModel);
            },
            validate: function (nodeMap) {
                validateNodes(nodeMap);
            }
        };

        var parseNode = function (currentNodeId, nodeMap, outputModel) {
            var nodeToParse = nodeMap[currentNodeId];
            var nodeType = parserUtils.getNodeType(nodeToParse);
            if (!hasParser(nodeType)) {
                throw new TypeError('Node of type ' + nodeType + ' not supported');
            }

            var toRepresentation = getParser(nodeType);
            var parsed = toRepresentation(nodeToParse[nodeType], nodeMap, outputModel);
            if (!parsed.hasOwnProperty('nodeId')) {
                parsed.nodeId = nodeToParse[nodeType].nodeName;
            }
            return parsed;
        };

        var hasParser = function(nodeType) {
            try {
                getParser(nodeType);
                return true;
            } catch(e) {
                return false;
            }
        };

        var getParser = function(nodeType) {
            var firstNonUpperCaseCharacter = function(str) {
                for (var i = 0; i < str.length; i++) {
                    var c = str[i];
                    if (!('A' <= c && c <= 'Z')) {
                        if (i > 1) {
                            return i - 1;
                        } else {
                            return i;
                        }
                    }
                }
                return -1;
            };

            var idx = firstNonUpperCaseCharacter(nodeType);
            var parserName = nodeType.slice(0, idx).toLowerCase() + nodeType.slice(idx) + 'Parser';
            return $injector.get(parserName);
        };

        var validateNodes = function (nodeMap) {
            var errorTypes = [];

            var nodes = [];
            for (var nodeId in nodeMap) {
                if (nodeMap.hasOwnProperty(nodeId)) {
                    nodes.push(nodeMap[nodeId]);
                }
            }

            if (nodes === null || nodes.length === 0) {
                throw new TypeError('Questionnaire Node list was empty or null.');
            }

            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var nodeType = parserUtils.getNodeType(node);
                if (!hasParser(nodeType)) {
                    errorTypes.push(nodeType);
                }
            }

            if (errorTypes.length > 0) {
                var error = new TypeError('The following Node types are not supported: ' + errorTypes);
                error.code = errorCodes.INVALID_QUESTIONNAIRE;
                throw error;
            }
        };

        return parser;
    });
}());
