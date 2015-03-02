(function() {
    'use strict';

    var delayNodeParser = angular.module('opentele.parserServices.delayNodeParser', [
        'opentele.translations'
    ]);

    delayNodeParser.service('delayNodeParser', function($translate, $interval,
                                                        parserUtils, nodesParser) {

            return function(node, nodeMap) {

                var onTimerStopped = function(scope) {
                    scope.nextNode(node.next, nodesParser, nodeMap);
                };

                return {
                    nodeTemplate: parserUtils.getNodeTemplate('delayNode.html'),
                    nodeModel: {
                        nodeId: node.nodeName,
                        heading: node.displayTextString,
                        count: (node.countUp === true) ? 0 : node.countTime,
                        countTime: node.countTime,
                        countUp: node.countUp,
                        onTimerStopped: onTimerStopped
                    }
                };

            };
        });
}());
