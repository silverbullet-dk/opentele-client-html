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
				"GlucoseUrineDeviceNode": {
					"nodeName": "144",
					"next": "ANSEV_112_D110",
					"nextFail": "AN_110_CANCEL",
					"text": "Indtast resultatet fra din urinundersøgelse\nGlukose (sukker)",
					"glucoseUrine": {
						"name": "110.URINE_GLUCOSE",
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

		it('should parse node urine glucose node', function() {
			var parsed = parseNode();

			expect(parsed).toBeDefined();
			expect(parsed.nodeTemplate).toMatch(/fake template/);
			expect(parsed.nodeModel.heading).toMatch(/Indtast resultatet fra din urinundersøgelse/);
			expect(parsed.nodeModel.measurement).not.toBeDefined();
			expect(parsed.nodeModel.measurementSelections).toEqual(['URINE_LEVEL_NEGATIVE', 'URINE_LEVEL_PLUS_ONE',
																	'URINE_LEVEL_PLUS_TWO', 'URINE_LEVEL_PLUS_THREE', 'URINE_LEVEL_PLUS_FOUR']);
			expect(templateCache.get.mostRecentCall.args[0]).toMatch(/urineLevel.html/);
			expect(parsed.leftButton).toBeDefined();
			expect(parsed.rightButton).toBeDefined();
		});

		it('should assign to output model when right button clicked', function () {
			var parsed = parseNode();

			var right = parsed.rightButton;
			expect(right.text).toBe('Next');
			expect(right.nextNodeId).toBe(node.GlucoseUrineDeviceNode.next);
			expect(right.clickAction).toBeDefined();
			var scope = {
				outputModel: {
					'110.URINE_GLUCOSE': {}
				},
				nodeModel: {
					measurement: 2
				}
			};

			right.clickAction(scope);

			var output = scope.outputModel['110.URINE_GLUCOSE'];
			expect(output.type).toBe('Integer');
			expect(output.value).toBe(2);
		});

		it('should have a cancel button setup', function () {
			var parsed = parseNode();

			var left = parsed.leftButton;
			expect(left.text).toBe('Omit');
			expect(left.nextNodeId).toBe(node.GlucoseUrineDeviceNode.nextFail);
			expect(left.clickAction).not.toBeDefined();
		});
	});
}());
