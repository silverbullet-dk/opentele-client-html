(function() {
    'use strict';


    var testRuns = [
        {
            node: {
                "nodeName": "FLOAT_NODE",
                "next": "NEXT_F_ID",
                "nextFail": "NEXT_F_FAIL_ID",
                "text": "Some kind of heading",
                "outputAsFloat": {
                    "name": "144.MYVALUE",
                    "type": "Float"
                }
            },
            nodeValueEntry: 'outputAsFloat',
            translationKey: 'MYKEY_1'
		},
		{
			node: {
				"nodeName": "INTEGER_NODE",
				"next": "NEXT_I_ID",
				"nextFail": "NEXT_I_FAIL_ID",
				"text": "Some other heading even more informative",
				"outputAsInt": {
					"name": "131.MYVALUE",
					"type": "Integer"
				}
			},
			nodeValueEntry: 'outputAsInt',
			translationKey: 'MYKEY_2'
		}
 	];

    describe('opentele.parserServices.parserUtils', function() {
        var templateCache, parserUtils;

        beforeEach(module('opentele.parserServices'));

        beforeEach(inject(function($templateCache, _parserUtils_) {
            templateCache = $templateCache;
            parserUtils = _parserUtils_;
        }));

        testRuns.forEach(function(run) {
            describe('can parse simple input device node', function() {
				var nodeMap, parse;

                beforeEach(function() {
					templateCache.get = jasmine.createSpy().andReturn('fake template #field_name#');

                    nodeMap = {
                        '144': run.node
                    };

                    parse = function() {
                        return parserUtils.parseSimpleInputNode(run.node, run.node[run.nodeValueEntry], run.translationKey);
                    };
                });

                it('should parse node', function() {
                    var parsed = parse();

                    expect(parsed).toBeDefined();
                    expect(parsed.nodeTemplate).toMatch(new RegExp('fake template ' + run.translationKey, 'g'));
                    expect(parsed.nodeModel.heading).toBe(run.node.text);
                    expect(templateCache.get.mostRecentCall.args[0]).toMatch(/simpleInputNode.html/);
                    expect(parsed.leftButton).toBeDefined();
                    expect(parsed.rightButton).toBeDefined();
                });

                it('should setup right button with click action', function() {
                    var parsed = parse();

                    var right = parsed.rightButton;
                    expect(right.text).toBe('Next');
                    expect(right.nextNodeId).toBe(run.node.next);
                    expect(right.clickAction).toBeDefined();
                    var scope = {
                        outputModel: {},
                        nodeModel: {
                            measurement: 8.1
                        }
                    };
					var outputName = run.node[run.nodeValueEntry].name;
					var outputType = run.node[run.nodeValueEntry].type;
					scope.outputModel[outputName] = {};

                    right.clickAction(scope);

					var output = scope.outputModel[outputName];
                    expect(output.type).toBe(outputType);
                    expect(output.value).toBe(8.1);
                });

                it('should setup left button', function() {
                    var parsed = parse();

                    var left = parsed.leftButton;
                    expect(left.text).toBe('Omit');
                    expect(left.nextNodeId).toBe(run.node.nextFail);
                    expect(left.clickAction).not.toBeDefined();
                });
            });
        });
    });
}());
