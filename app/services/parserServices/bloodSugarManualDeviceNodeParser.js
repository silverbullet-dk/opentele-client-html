(function() {
    'use strict';

    angular.module('opentele.parserServices.bloodSugarManualDeviceNodeParser', [])
        .service('bloodSugarManualDeviceNodeParser', function($templateCache, parserUtils) {
            return function(node) {
                var representation = {
                    nodeTemplate: parserUtils.getNodeTemplate('bloodSugarManualDeviceNode.html'),
                    nodeModel: {
                        heading: node.text
                    }
                };

                representation.rightButton = {
                    text: "Next",
                    nextNodeId: node.next,
                    validate: function(scope) {
                        return scope.bloodSugarForm.count.$valid;
                    },
                    clickAction: function(scope) {
                        var nodeName = node.bloodSugarMeasurements.name;
                        var isBeforeMeal = scope.nodeModel.bloodSugarManualBeforeMeal;
                        var isAfterMeal = scope.nodeModel.bloodSugarManualAfterMeal;
                        var timestamp = new Date().toISOString();
                        scope.outputModel[nodeName] = {
                            name: nodeName,
                            type: 'BloodSugarMeasurements',
                            value: {
                                measurements: [{
                                    'result': scope.nodeModel.bloodSugarManualMeasurement,
                                    'isBeforeMeal': isBeforeMeal,
                                    'isAfterMeal': isAfterMeal,
                                    'timeOfMeasurement': timestamp
        						}],
                                transferTime: timestamp
                            }
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
