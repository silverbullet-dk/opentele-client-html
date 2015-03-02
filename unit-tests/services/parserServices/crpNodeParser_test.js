(function () {
    'use strict';

    describe('opentele.parserServices', function () {
        var nodesParser, templateCache;

        beforeEach(module('opentele.parserServices'));

        beforeEach(inject(function ($templateCache, _nodesParser_) {
            templateCache = $templateCache;
            nodesParser = _nodesParser_;

            templateCache.get = jasmine.createSpy().andReturn("fake template");
        }));

        describe('can parse crpNode', function () {
            var nodeMap;
            beforeEach(function () {
                var node = {
                    "CRPNode": {
                        "nodeName": "146",
                        "text": "Indtast værdi eller vælg <5",
                        "next": "ANSEV_147_D146",
                        "nextFail": "AN_146_CANCEL",
                        "CRP": {
                            "name": "146.CRP",
                            "type": "Integer"
                        }
                    }
                };
                nodeMap = {'146': node};
            });

            it('should parse node', function () {
                var parsed = nodesParser.parse('146', nodeMap, {});

                expect(parsed).toBeDefined();
                expect(parsed.nodeTemplate).toMatch(/fake template/);
                expect(parsed.nodeModel.heading).toBe('Indtast værdi eller vælg <5');
                expect(templateCache.get.mostRecentCall.args[0]).toMatch(/crpNode.html/);
                expect(parsed.leftButton).toBeDefined();
                expect(parsed.rightButton).toBeDefined();
            });

            it('should setup right button with click action (lt5)', function () {
                var parsed = nodesParser.parse('146', nodeMap, {});

                var right = parsed.rightButton;
                expect(right.text).toBe('Next');
                expect(right.nextNodeId).toBe('ANSEV_147_D146');
                expect(right.clickAction).toBeDefined();
                var scope = {
                    outputModel: {
                        '146.CRP': {}
                    },
                    nodeModel: {
                        crpLt5Measurement: true
                    }
                };

                right.clickAction(scope);

                var output = scope.outputModel['146.CRP'];
                expect(output.name).toBe('146.CRP');
                expect(output.type).toBe('Integer');
                expect(output.value).toBe(0);
            });

            it('should setup right button with click action (count)', function () {
                var parsed = nodesParser.parse('146', nodeMap, {});

                var right = parsed.rightButton;
                expect(right.text).toBe('Next');
                expect(right.nextNodeId).toBe('ANSEV_147_D146');
                expect(right.clickAction).toBeDefined();
                var scope = {
                    outputModel: {
                        '146.CRP': {}
                    },
                    nodeModel: {
                        crpCountMeasurement: 7
                    }
                };

                right.clickAction(scope);

                var output = scope.outputModel['146.CRP'];
                expect(output.name).toBe('146.CRP');
                expect(output.type).toBe('Integer');
                expect(output.value).toBe(7);
            });

            it('should setup right button with click action (count < 5)', function () {
                var parsed = nodesParser.parse('146', nodeMap, {});

                var right = parsed.rightButton;
                expect(right.text).toBe('Next');
                expect(right.nextNodeId).toBe('ANSEV_147_D146');
                expect(right.clickAction).toBeDefined();
                var scope = {
                    outputModel: {
                        '146.CRP': {}
                    },
                    nodeModel: {
                        crpCountMeasurement: 3
                    }
                };

                right.clickAction(scope);

                var output = scope.outputModel['146.CRP'];
                expect(output.name).toBe('146.CRP');
                expect(output.type).toBe('Integer');
                expect(output.value).toBe(0);
            });

            it('should setup left button', function () {
                var parsed = nodesParser.parse('146', nodeMap, {});

                var left = parsed.leftButton;
                expect(left.text).toBe('Omit');
                expect(left.nextNodeId).toBe('AN_146_CANCEL');
                expect(left.clickAction).not.toBeDefined();
            });
        });
    });
}());
