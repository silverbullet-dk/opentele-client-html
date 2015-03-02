(function() {
	'use strict';

	angular.module('opentele.parserServices.temperatureDeviceNodeParser', [])
		.service('temperatureDeviceNodeParser', function(parserUtils) {
			return function(node) {
				return parserUtils.parseSimpleInputNode(node, node.temperature, 'TEMPERATURE');
			};
		});
}());
