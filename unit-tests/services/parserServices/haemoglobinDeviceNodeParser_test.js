(function() {
    'use strict';

    describe('opentele.parserServices.haemoglobinDeviceNodeParser', function() {
        var nodesParser, parserUtils, nodeMap, parseNode, node;

        beforeEach(module('opentele.parserServices'));

        beforeEach(inject(function(_nodesParser_, _parserUtils_) {
            nodesParser = _nodesParser_;
            parserUtils = _parserUtils_;

            spyOn(parserUtils, 'parseSimpleInputNode').andReturn({});

            node = {
                "HaemoglobinDeviceNode": {
                    "nodeName": "144",
                    "next": "ANSEV_145_D144",
                    "nextFail": "AN_144_CANCEL",
                    "text": "Mål hæmoglobinindholdet i dit blod og indtast resultatet nedenfor",
                    "haemoglobinValue": {
                        "name": "144.HEMOGLOBIN",
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

			expect(parserUtils.parseSimpleInputNode).toHaveBeenCalledWith(node.HaemoglobinDeviceNode,
																		  node.HaemoglobinDeviceNode.haemoglobinValue,
																		  'HAEMOGLOBIN');
        });
    });
}());
