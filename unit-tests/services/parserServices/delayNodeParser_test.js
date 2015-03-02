(function() {
    'use strict';

    describe('opentele.parserServices.delayNodeParser', function() {
        var nodesParser, templateCache;

        beforeEach(module('opentele.parserServices'));

        beforeEach(inject(function ($templateCache, _nodesParser_) {
            templateCache = $templateCache;
            nodesParser = _nodesParser_;

            templateCache.get = jasmine.createSpy().andReturn("fake template");
        }));

        describe('can parse DelayNode', function() {
            var nodeMap;
            beforeEach(function () {
                var node = {
                    "DelayNode": {
                        "nodeName": "176",
                        "elements": [],
                        "countTime": 3,
                        "countUp": false,
                        "displayTextString": "Nedtælling på 45 sek inden teststart",
                        "next": "177"
                    }
                };
                nodeMap = {'176': node};
            });

            it('should parse node', function () {
                var parsed = nodesParser.parse('176', nodeMap, {});

                expect(parsed).toBeDefined();
                expect(parsed.nodeTemplate).toMatch(/fake template/);
                expect(parsed.nodeModel.nodeId).toBe('176');
                expect(parsed.nodeModel.heading).toBe('Nedtælling på 45 sek inden teststart');
                expect(parsed.nodeModel.count).toBe(3);
                expect(parsed.nodeModel.countTime).toBe(3);
                expect(parsed.nodeModel.countUp).toBe(false);
                expect(parsed.nodeModel.onTimerStopped).toBeDefined();
                expect(templateCache.get.mostRecentCall.args[0]).toMatch(/delayNode.html/);
                expect(parsed.leftButton).toBeUndefined();
                expect(parsed.rightButton).toBeUndefined();
            });
        });
    });
}());
