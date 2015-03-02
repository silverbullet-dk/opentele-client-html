(function() {
    'use strict';

    angular.module('opentele.parserServices.crpNodeParser', [])
        .service('crpNodeParser', function($templateCache, parserUtils) {
            return function(node) {

                var representation = {
                    nodeTemplate: parserUtils.getNodeTemplate('crpNode.html'),
                    nodeModel: {
                        heading: node.text
                    }
                };

                representation.rightButton = {
                    text: "Next",
                    nextNodeId: node.next,
                    validate: function(scope) {
                        var isLt5CheckedAndNothingElse = function() {
                            return (scope.nodeModel.crpLt5Measurement === true) && (
                                (scope.nodeModel.crpCountMeasurement === undefined) ||
                                (scope.nodeModel.crpCountMeasurement === null) ||
                                (scope.nodeModel.crpCountMeasurement.length === 0));
                        };
                        var isValueEnteredAndNothingElse = function () {
                            return (scope.nodeModel.crpLt5Measurement !== true) &&
                                (scope.nodeModel.crpCountMeasurement !== undefined) &&
                                (scope.nodeModel.crpCountMeasurement !== null) &&
                                (0 <= scope.nodeModel.crpCountMeasurement) &&
                                (0 < scope.nodeModel.crpCountMeasurement.toString().length);
                        };
                        return isLt5CheckedAndNothingElse() || isValueEnteredAndNothingElse();
                    },
                    clickAction: function(scope) {
                        var nodeName = node.CRP.name;
                        var lt5 = scope.nodeModel.crpLt5Measurement;
                        var count = scope.nodeModel.crpCountMeasurement;
                        scope.outputModel[nodeName] = {
                            name: nodeName,
                            type: node.CRP.type,
                            value: (lt5 || count < 5) ? 0 : count
                        };
                    }
                };

                representation.leftButton = {
                    text: "Omit",
                    nextNodeId: node.nextFail
                };
                return representation;
            };
        });
}());
