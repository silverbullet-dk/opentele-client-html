(function() {
	'use strict';

	angular.module('opentele.parserServices.urineDeviceNodeParser', [])
		.service('urineDeviceNodeParser', function($templateCache, parserUtils) {
			return function(node) {
				var representation = {
					nodeTemplate: parserUtils.getNodeTemplate('urineLevel.html'),
					nodeModel: {
						heading: node.text,
						measurementSelections: ['URINE_LEVEL_NEGATIVE', 'URINE_LEVEL_PLUS_MINUS', 'URINE_LEVEL_PLUS_ONE',
												'URINE_LEVEL_PLUS_TWO', 'URINE_LEVEL_PLUS_THREE', 'URINE_LEVEL_PLUS_FOUR']
					}
				};

				representation.rightButton = {
					text: "Next",
					nextNodeId: node.next,
					clickAction: function(scope) {
						var nodeName = node.urine.name;
						scope.outputModel[nodeName] = {
							name: nodeName,
							type: node.urine.type,
							value: scope.nodeModel.measurement
						};
					},
					validate: function(scope) {
						return scope.inputForm.$dirty;
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
