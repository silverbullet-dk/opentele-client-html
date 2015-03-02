(function () {
	'use strict';

	describe('opentele.parserServices', function () {
		var nodesParser, decisionNode, nodeMap, decisionEntry, parse, outputModel, buildDecisionNode, buildOutputModel;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function (_nodesParser_) {
			nodesParser = _nodesParser_;
		}));

		beforeEach(function() {
			var ifTrueNode = {
				"AssignmentNode": {
					"nodeName": "AN_493_T492",
					"next": "159",
					"variable": {
						"name": "492.DECISION",
						"type": "Boolean"
					},
					"expression": {
						"type": "Boolean",
						"value": true
					}
				}
			};
			var ifFalseNode = {
				"AssignmentNode": {
					"nodeName": "AN_496_F492",
					"next": "159",
					"variable": {
						"name": "492.DECISION",
						"type": "Boolean"
					},
					"expression": {
						"type": "Boolean",
						"value": false
					}
				}
			};
			var lastNode = {
				"EndNode": {
					"nodeName": "159"
				}
			};

			decisionEntry = '492.DECISION';

			buildOutputModel = function(value, type) {
				outputModel = {
					'491.BP#DIASTOLIC': {name: '491.BP#DIASTOLIC', type: type, value: value}
				};
			};

			parse = function() {
				nodeMap = {'492': decisionNode, 'AN_493_T492': ifTrueNode, 'AN_496_F492': ifFalseNode, '159': lastNode};
				return nodesParser.parse('492', nodeMap, outputModel);
			};
		});

		var runTestAndAssert = function(value, outputModelValue, type, expectedResult) {
			buildDecisionNode(value, type);
			buildOutputModel(outputModelValue, type);

			var parsed = parse();

			expect(parsed).toBeDefined();
			expect(parsed.nodeId).toEqual("159");
			expect(outputModel[decisionEntry].value).toBe(expectedResult);
		};

		describe('can parse DecisionNode less than expressions', function () {
			beforeEach(function() {
				buildDecisionNode = function(value, type) {
					decisionNode = {
						"DecisionNode": {
							"nodeName": "492",
							"next": "AN_493_T492",
							"nextFalse": "AN_496_F492",
							"expression": {
								"lt": {
									"left": {
										"type": type,
										"value": value
									},
									"right": {
										"type": "name",
										"value": "491.BP#DIASTOLIC"
									}
								}
							}
						}
					};
				};
			});

			it('should evaluate less than Integer expression to true', function () {
				runTestAndAssert(41, 42, 'Integer', true);
			});

			it('should evaluate less than Integer expression to false', function () {
				runTestAndAssert(43, 42, 'Integer', false);
			});

			it('should evaluate less than Integer expression to false when values are equal', function () {
				runTestAndAssert(42, 42, 'Integer', false);
			});

			it('should evaluate less than Float expression to true', function () {
				runTestAndAssert(41.9, 42.1, 'Float', true);
			});

			it('should evaluate less than Float expression to false', function () {
				runTestAndAssert(42.2, 42.1, 'Float', false);
			});

			it('should evaluate less than Float expression to false when values are equal', function () {
				runTestAndAssert(42.1, 42.1, 'Float', false);
			});

			it('should throw error if datatype is Boolean and operator is lt', function () {
				expect(function() {runTestAndAssert(true, false, 'Boolean', false);}).toThrow();
			});
		});

		describe('can parse DecisionNode greater than expressions', function () {
			beforeEach(function() {
				buildDecisionNode = function(value, type) {
					decisionNode = {
						"DecisionNode": {
							"nodeName": "492",
							"next": "AN_493_T492",
							"nextFalse": "AN_496_F492",
							"expression": {
								"gt": {
									"left": {
										"type": type,
										"value": value
									},
									"right": {
										"type": "name",
										"value": "491.BP#DIASTOLIC"
									}
								}
							}
						}
					};
				};
			});

			it('should evaluate greater than Integer expression to true', function () {
				runTestAndAssert(43, 42, 'Integer', true);
			});

			it('should evaluate greater than Integer expression to false', function () {
				runTestAndAssert(41, 42, 'Integer', false);
			});

			it('should evaluate greater than Integer expression to false when values are equal', function () {
				runTestAndAssert(42, 42, 'Integer', false);
			});

			it('should evaluate greater than Float expression to true', function () {
				runTestAndAssert(42.11, 42.1, 'Float', true);
			});

			it('should evaluate greater than Float expression to false', function () {
				runTestAndAssert(42.09, 42.1, 'Float', false);
			});

			it('should evaluate greater than Float expression to false when values are equal', function () {
				runTestAndAssert(42.1, 42.1, 'Float', false);
			});

			it('should throw error if datatype is Boolean and operator is gt', function () {
				expect(function() {runTestAndAssert(true, false, 'Boolean', false);}).toThrow();
			});
		});

		describe('can parse DecisionNode equal expressions', function () {
			beforeEach(function() {
				buildDecisionNode = function(value, type) {
					decisionNode = {
						"DecisionNode": {
							"nodeName": "492",
							"next": "AN_493_T492",
							"nextFalse": "AN_496_F492",
							"expression": {
								"eq": {
									"left": {
										"type": "name",
										"value": "491.BP#DIASTOLIC"
									},
									"right": {
										"type": type,
										"value": value
									}
								}
							}
						}
					};
				};
			});

			it('should evaluate equal Integer expression to true', function () {
				runTestAndAssert(42, 42, 'Integer', true);
			});

			it('should evaluate equal Integer expression to false when left is less than', function () {
				runTestAndAssert(41, 42, 'Integer', false);
			});

			it('should evaluate equal Integer expression to false when left is greater than', function () {
				runTestAndAssert(43, 42, 'Integer', false);
			});

			it('should evaluate equal Float expression to true', function () {
				runTestAndAssert(42.11, 42.11, 'Float', true);
			});

			it('should evaluate equal Float expression to false when left is less than', function () {
				runTestAndAssert(42.09, 42.1, 'Float', false);
			});

			it('should evaluate equal Float expression to false when left is greater than', function () {
				runTestAndAssert(42.11, 42.1, 'Float', false);
			});

			it('should evaluate equal Boolean expression to true when both are true', function () {
				runTestAndAssert(true, true, 'Boolean', true);
			});

			it('should evaluate equal Boolean expression to true when both are false', function () {
				runTestAndAssert(false, false, 'Boolean', true);
			});

			it('should evaluate equal Boolean expression to false when left is true', function () {
				runTestAndAssert(true, false, 'Boolean', false);
			});

			it('should evaluate equal Boolean expression to false when left is false', function () {
				runTestAndAssert(false, true, 'Boolean', false);
			});
		});

		describe('DecisionNode error handling', function () {
			beforeEach(function() {
				buildDecisionNode = function(value, type) {
					decisionNode = {
						"DecisionNode": {
							"nodeName": "492",
							"next": "AN_493_T492",
							"nextFalse": "AN_496_F492",
							"expression": {
								"eq": {
									"left": {
										"type": "name",
										"value": "491.BP#DIASTOLIC"
									},
									"right": {
										"type": type,
										"value": value
									}
								}
							}
						}
					};
				};
			});

			it('should throw error if operator is unsupported', function () {
				decisionNode = {
					"DecisionNode": {
						"nodeName": "492",
						"next": "AN_493_T492",
						"nextFalse": "AN_496_F492",
						"expression": {
							"lte": {
								"left": {
									"type": "name",
									"value": "491.BP#DIASTOLIC"
								},
								"right": {
									"type": "Integer",
									"value": 42
								}
							}
						}
					}
				};
				buildOutputModel(42, 'Integer');

				expect(function() {parse();}).toThrow();
			});

			it('should throw error if datatypes does match', function () {
				buildDecisionNode(true, 'Boolean');
				buildOutputModel(42, 'Integer');

				expect(function() {parse();}).toThrow();
			});

			it('should throw error if datatype is unsupported', function () {
				buildDecisionNode(42, 'BloodSugarMeasurements');
				outputModel = {
					'491.BP#DIASTOLIC': {
						name: '491.BP#DIASTOLIC',
						type: 'BloodSugarMeasurements',
						value: {
							measurements: [{result: 1, isBeforeMeal: true, isAfterMeal: false, timeOfMeasurement: '2014-10-14T08:29:56.045Z'}],
							transferTime: '2014-10-14T08:29:56.045Z'
						}
					}
				};

				expect(function() {parse();}).toThrow();
			});
		});
	});
}());
