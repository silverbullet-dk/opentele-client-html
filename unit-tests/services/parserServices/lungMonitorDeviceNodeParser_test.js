(function() {
	'use strict';

	describe('opentele.parserServices.lungMonitorDeviceNodeParser', function() {
		var nodesParser, parserUtils, nodeMap, parseNode, node;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function(_nodesParser_, _parserUtils_) {
			nodesParser = _nodesParser_;
			parserUtils = _parserUtils_;

			spyOn(parserUtils, 'parseSimpleInputNode').andReturn({});

			node = {
				"LungMonitorDeviceNode": {
					"nodeName": "172",
					"next": "ANSEV_173_D172",
					"nextFail": "AN_172_CANCEL",
					"text": "Måling af lungefunktion",
					"fev1": {
						"name": "172.LF#FEV1",
						"type": "Float"
					},
					"fev6": {
						"name": "172.LF#FEV6",
						"type": "Float"
					},
					"fev1Fev6Ratio": {
						"name": "172.LF#FEV1_FEV6_RATIO",
						"type": "Float"
					},
					"fef2575": {
						"name": "172.LF#FEF2575",
						"type": "Float"
					},
					"goodTest": {
						"name": "172.LF#FEV_GOOD_TEST",
						"type": "Boolean"
					},
					"softwareVersion": {
						"name": "172.LF#FEV_SOFTWARE_VERSION",
						"type": "Integer"
					},
					"deviceId": {
						"name": "172.LF#DEVICE_ID",
						"type": "String"
					}
				}
			};
			nodeMap = {
				'172': node
			};

			parseNode = function() {
				return nodesParser.parse('172', nodeMap, {});
			};
		}));

		it('should parse node as simple input node', function() {
			parseNode();

			expect(parserUtils.parseSimpleInputNode).toHaveBeenCalledWith(node.LungMonitorDeviceNode,
																		node.LungMonitorDeviceNode.fev1,
																		'LUNG_MONITOR');
		});
	});
}());
