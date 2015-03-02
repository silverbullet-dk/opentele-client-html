(function() {
	'use strict';

	describe('opentele.parserServices.urineDeviceNodeParser', function() {
		var templateCache, nodesParser, parserUtils, nodeMap, parseNode, node;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function($templateCache, _nodesParser_, _parserUtils_) {
			templateCache = $templateCache;
			nodesParser = _nodesParser_;
			parserUtils = _parserUtils_;

			templateCache.get = jasmine.createSpy().andReturn("fake template");

			node = {
				"UrineDeviceNode": {
					"nodeName": "144",
					"next": "ANSEV_132_D131",
					"nextFail": "AN_131_CANCEL",
					"text": "Mål proteinindholdet i din urin og indtast resultatet nedenfor",
					"urine": {
						"name": "131.URINE",
						"type": "Integer"
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

		it('should parse node urine protein node', function() {
			var parsed = parseNode();

			expect(parsed).toBeDefined();
			expect(parsed.nodeTemplate).toMatch(/fake template/);
			expect(parsed.nodeModel.heading).toMatch(/Mål proteinindholdet i din urin/);
			expect(parsed.nodeModel.measurement).not.toBeDefined();
			expect(parsed.nodeModel.measurementSelections).toEqual(['URINE_LEVEL_NEGATIVE', 'URINE_LEVEL_PLUS_MINUS', 'URINE_LEVEL_PLUS_ONE',
																	'URINE_LEVEL_PLUS_TWO', 'URINE_LEVEL_PLUS_THREE', 'URINE_LEVEL_PLUS_FOUR']);
			expect(templateCache.get.mostRecentCall.args[0]).toMatch(/urineLevel.html/);
			expect(parsed.leftButton).toBeDefined();
			expect(parsed.rightButton).toBeDefined();
		});

		it('should assign to output model when right button clicked', function () {
			var parsed = parseNode();

			var right = parsed.rightButton;
			expect(right.text).toBe('Next');
			expect(right.nextNodeId).toBe(node.UrineDeviceNode.next);
			expect(right.clickAction).toBeDefined();
			var scope = {
				outputModel: {
					'131.URINE': {}
				},
				nodeModel: {
					measurement: 2
				}
			};

			right.clickAction(scope);

			var output = scope.outputModel['131.URINE'];
			expect(output.type).toBe('Integer');
			expect(output.value).toBe(2);
		});

		it('should have a cancel button setup', function () {
			var parsed = parseNode();

			var left = parsed.leftButton;
			expect(left.text).toBe('Omit');
			expect(left.nextNodeId).toBe(node.UrineDeviceNode.nextFail);
			expect(left.clickAction).not.toBeDefined();
		});
	});
}());
