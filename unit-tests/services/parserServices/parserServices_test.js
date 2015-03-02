(function () {
    'use strict';

    describe('opentele.parserServices', function () {
        var nodesParser;

        beforeEach(module('opentele.parserServices'));

        beforeEach(inject(function (_nodesParser_) {
            nodesParser = _nodesParser_;
        }));

        describe('can check for unsupported nodes', function() {

            it('should return true if all node types are supported by parser', function() {
                var nodes = [
                        { "IONode": {"nodeName": "157"}},
                        { "EndNode": {"nodeName": "159"}}
                    ];


                expect(function() {nodesParser.validate(nodes);}).not.toThrow();
            });

            it('should throw error when on node is unsupported by parser', function() {
                var nodes = [
                    { "IONode": {"nodeName": "157"}},
                    { "UnsupportedNode": {"nodeName": "159"}}
                ];

                expect(function() {nodesParser.validate(nodes);}).toThrow('The following Node types are not supported: UnsupportedNode');
            });

            it('should throw error when empty or null node list is passed', function() {
                expect(function() {nodesParser.validate([]);}).toThrow('Questionnaire Node list was empty or null.');
                expect(function() {nodesParser.validate(null);}).toThrow('Questionnaire Node list was empty or null.');
            });
        });
    });
}());
