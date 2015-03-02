(function() {
    'use strict';

    angular.module('opentele.parserServices.assignmentNodeParser', [])
        .service('assignmentNodeParser', function(nodesParser) {
            return function(node, nodeMap, outputModel) {
                var variableName = node.variable.name;
                outputModel[variableName] = {
                    name: variableName,
                    value: node.expression.value,
                    type: node.variable.type
                };

                var nextNodeId = node.next;
                return nodesParser.parse(nextNodeId, nodeMap, outputModel);
            };
        });
}());
