(function() {
    'use strict';

    angular.module('opentele.parserServices.lungMonitorDeviceNodeParser', [])
		.service('lungMonitorDeviceNodeParser', function(parserUtils) {
			return function(node) {
				return parserUtils.parseSimpleInputNode(node, node.fev1, 'LUNG_MONITOR');
			};
		});
}());
