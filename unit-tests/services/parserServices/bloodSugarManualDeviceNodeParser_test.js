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

		describe('can parse BloodSugarManualDeviceNode', function() {
			var nodeMap;
			beforeEach(function() {
				var node = {
					"BloodSugarManualDeviceNode": {"nodeName": "158", "next": "ANSEV_159_D158", "nextFail": "AN_158_CANCEL", "text": "Blodsukker",
						"bloodSugarMeasurements": {"name": "158.BS#BLOODSUGARMEASUREMENTS", "type": "Integer"},
						"deviceId": {"name": "158.BS#DEVICE_ID", "type": "String"}
					}
				};
				nodeMap = {'158': node};
			});

			it('should parse node', function() {
				var parsed = nodesParser.parse('158', nodeMap, {});

				expect(parsed).toBeDefined();
				expect(parsed.nodeTemplate).toMatch(/fake template/);
				expect(parsed.nodeModel.heading).toBe('Blodsukker');
				expect(templateCache.get.mostRecentCall.args[0]).toMatch(/bloodSugarManualDeviceNode.html/);
				expect(parsed.leftButton).toBeDefined();
				expect(parsed.rightButton).toBeDefined();
			});

			it('should setup right button with click action', function() {
				var parsed = nodesParser.parse('158', nodeMap, {});

				var right = parsed.rightButton;
				expect(right.text).toBe('Next');
				expect(right.nextNodeId).toBe('ANSEV_159_D158');
				expect(right.clickAction).toBeDefined();
				var scope =  {
					outputModel: {
						'158.BS#BLOODSUGARMEASUREMENTS': {}
					},
					nodeModel: {}
				};

				right.clickAction(scope);

				var output = scope.outputModel['158.BS#BLOODSUGARMEASUREMENTS'];
				expect(output.name).toBe('158.BS#BLOODSUGARMEASUREMENTS');
				expect(output.type).toBe('BloodSugarMeasurements');
				expect(output.value).toBeDefined();
				expect(output.value.measurements.length).toBe(1);
				var measurements = output.value.measurements[0];
				expect(measurements.hasOwnProperty('result')).toBe(true);
				expect(measurements.hasOwnProperty('isBeforeMeal')).toBe(true);
				expect(measurements.hasOwnProperty('isAfterMeal')).toBe(true);
				expect(measurements.hasOwnProperty('timeOfMeasurement')).toBe(true);
			});

			it('should setup left button', function() {
				var parsed = nodesParser.parse('158', nodeMap, {});

				var left = parsed.leftButton;
				expect(left.text).toBe('Omit');
				expect(left.nextNodeId).toBe('AN_158_CANCEL');
				expect(left.clickAction).not.toBeDefined();
			});
		});
	});
}());
