(function () {
	'use strict';

	describe('opentele.parserServices', function () {
		var nodesParser;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function (_nodesParser_) {
			nodesParser = _nodesParser_;
		}));

		describe('can parse AssignmentNode', function() {
			it('should execute boolean assignment', function() {
				var node = {
					"AssignmentNode": {
						"nodeName": "AN_158_CANCEL",
						"next": "159",
						"variable": {
							"name": "158.BS##CANCEL", "type": "Boolean"
						},
						"expression": {"type": "Boolean", "value": true}
					}
				};
				var nextNode = {
					"EndNode": {
						"nodeName": "159"
					}
				};
				var nodeMap = {'AN_158_CANCEL': node, '159': nextNode};

				var outputModel = {};
				nodesParser.parse('AN_158_CANCEL', nodeMap, outputModel);

				expect(outputModel['158.BS##CANCEL']).toBeDefined();
				expect(outputModel['158.BS##CANCEL'].name).toBe('158.BS##CANCEL');
				expect(outputModel['158.BS##CANCEL'].value).toBe(true);
				expect(outputModel['158.BS##CANCEL'].type).toBe('Boolean');
			});

			it('should execute string assignment', function() {
				var node = {
					"AssignmentNode": {
						"nodeName": "AN_158_CANCEL",
						"next": "159",
						"variable": {
							"name": "158.BS##CANCEL", "type": "String"
						},
						"expression": {"type": "String", "value": "assign me"}
					}
				};
				var nextNode = {
					"EndNode": {
						"nodeName": "159"
					}
				};
				var nodeMap = {'AN_158_CANCEL': node, '159': nextNode};

				var outputModel = {};
				nodesParser.parse('AN_158_CANCEL', nodeMap, outputModel);

				expect(outputModel['158.BS##CANCEL']).toBeDefined();
				expect(outputModel['158.BS##CANCEL'].name).toBe('158.BS##CANCEL');
				expect(outputModel['158.BS##CANCEL'].value).toBe('assign me');
				expect(outputModel['158.BS##CANCEL'].type).toBe('String');
			});

			it('should keep parsing nodes until a non-assignment node is reached', function() {
				var node = {
					"AssignmentNode": {
						"nodeName": "AN_158_CANCEL",
						"next": "AN_NEXT",
						"variable": {
							"name": "158.BS##CANCEL", "type": "Boolean"
						},
						"expression": {"type": "Boolean", "value": true}
					}
				};
				var nextNode = {
					"AssignmentNode": {
						"nodeName": "AN_NEXT",
						"next": "159",
						"variable": {
							"name": "AN##NEXT", "type": "String"
						},
						"expression": {"type": "String", "value": "assign me"}
					}
				};
				var lastNode = {
					"EndNode": {
						"nodeName": "159"
					}
				};

				var nodeMap = {'AN_158_CANCEL': node, 'AN_NEXT': nextNode, '159': lastNode};

				var outputModel = {};
				var parsed = nodesParser.parse('AN_158_CANCEL', nodeMap, outputModel);

				expect(parsed.nodeId).toBe('159');
				expect(parsed.isEndNode).toBe(true);
				expect(outputModel['158.BS##CANCEL']).toBeDefined();
				expect(outputModel['AN##NEXT']).toBeDefined();
			});
		});
	});
}());
