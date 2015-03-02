(function() {
	'use strict';

	describe('opentele.parserServices.temperatureDeviceNodeParser', function() {
		var nodesParser, parserUtils, nodeMap, parseNode, node;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function(_nodesParser_, _parserUtils_) {
			nodesParser = _nodesParser_;
			parserUtils = _parserUtils_;

			spyOn(parserUtils, 'parseSimpleInputNode').andReturn({});

			node = {
				"TemperatureDeviceNode": {
					"nodeName": "144",
					"next": "ANSEV_143_D142",
					"nextFail": "AN_142_CANCEL",
					"text": "Mål din temperatur og indtast resultatet i feltet nedenfor",
					"temperature": {
						"name": "144.TEMPERATURE",
						"type": "Float"
					}
				}
			};
			nodeMap = {
				'144': node
			};

			parseNode = function() {
				return nodesParser.parse('144', nodeMap, {});
			};
		}));

		it('should parse node as simple input node', function() {
			parseNode();

			expect(parserUtils.parseSimpleInputNode).toHaveBeenCalledWith(node.TemperatureDeviceNode,
																		node.TemperatureDeviceNode.temperature,
																		'TEMPERATURE');
		});
	});
}());
