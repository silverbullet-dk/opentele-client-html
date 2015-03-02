(function () {
	'use strict';

	describe('opentele.parserServices.ioNodeParser', function () {
		var nodesParser, templateCache;

		beforeEach(module('opentele.parserServices'));

		beforeEach(inject(function ($templateCache, _nodesParser_) {
			templateCache = $templateCache;
			nodesParser = _nodesParser_;

			templateCache.get = jasmine.createSpy().andReturn("fake template #heading#");
		}));

		describe('can parse IONode', function () {
			it('should parse IONode with one TextViewElement and one ButtonElement', function () {
				var node = { "IONode": {
					"nodeName": "157",
					"elements": [
						{
							"TextViewElement": {"text": "Så skal der måles blodsukker!"}
						},
						{
							"ButtonElement": {"text": "Næste", "gravity": "center", "next": "159"}
						}
					]}
				};
				var nodeMap = {'157': node};

				var parsed = nodesParser.parse('157', nodeMap, {});

				expect(parsed).toBeDefined();
				expect(parsed.nodeId).toEqual("157");
				expect(parsed.nodeTemplate).toMatch(/Så skal der måles blodsukker/);
				expect(templateCache.get.mostRecentCall.args[0]).toMatch(/ioNodeText.html/);
				expect(parsed.centerButton.text).toEqual('Næste');
				expect(parsed.centerButton.nextNodeId).toEqual('159');
				expect(parsed.leftButton).not.toBeDefined();
				expect(parsed.rightButton).not.toBeDefined();
			});

			it('should parse IONode with three ButtonElements', function () {
				var node = { "IONode": {
					"nodeName": "157",
					"elements": [
						{
							"ButtonElement": {"text": "Afbryd", "gravity": "left", "next": "161"}
						},
						{
							"ButtonElement": {"text": "Næste", "gravity": "center", "next": "159"}
						},
						{
							"ButtonElement": {"text": "Afslut", "gravity": "right", "next": "162"}
						}
					]}
				};
				var nodeMap = {'157': node};

				var parsed = nodesParser.parse('157', nodeMap, {});

				expect(parsed).toBeDefined();
				expect(parsed.leftButton.text).toEqual('Afbryd');
				expect(parsed.leftButton.nextNodeId).toEqual('161');
				expect(parsed.centerButton.text).toEqual('Næste');
				expect(parsed.centerButton.nextNodeId).toEqual('159');
				expect(parsed.rightButton.text).toEqual('Afslut');
				expect(parsed.rightButton.nextNodeId).toEqual('162');
			});

			it('should parse IONode with two TextViewElements', function () {
				var node = { "IONode": {
					"nodeName": "157",
					"elements": [
						{
							"TextViewElement": {"text": "Så skal der måles blodsukker!"}
						},
						{
							"TextViewElement": {"text": "Så skal der ogpå måles noget andet!"}
						}
					]}
				};
				var nodeMap = {'157': node};

				var parsed = nodesParser.parse('157', nodeMap, {});

				expect(parsed).toBeDefined();
				expect(parsed.nodeTemplate).toMatch(/Så skal der måles blodsukker/);
				expect(parsed.nodeTemplate).toMatch(/Så skal der ogpå måles noget andet/);
				expect(templateCache.get.mostRecentCall.args[0]).toMatch(/ioNodeText.html/);
			});

			it('should throw exception on unsupported EditTextElement type', function () {
				templateCache.get = jasmine.createSpy().andCallThrough();
				var node = {
					"IONode": {
						"nodeName": "199",
						"elements": [
							{"EditTextElement": {
								"outputVariable": {
									"name": "199.SAT#SATURATION",
									"type": "CheckBox"
								}
							}}]
					}};
				var nodeMap = {'199': node};

				expect(function() {nodesParser.parse('199', nodeMap, {});}).toThrow();
			});

			describe('Template replace', function () {
				beforeEach(function() {
					templateCache.get = jasmine.createSpy()
											.andReturn('replace me: #form_name# #input_name# type="#type#" step="#step#"');
				});

				it('should parse IONode with Integer EditTextElements', function () {
					var node = {
						"IONode": {
							"nodeName": "199",
							"elements": [
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#SATURATION",
										"type": "Integer"
									}
								}}]
						}};
					var nodeMap = {'199': node};

					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed).toBeDefined();
					expect(templateCache.get.mostRecentCall.args[0]).toMatch(/ioNodeEditText.html/);
					expect(parsed.nodeTemplate).toMatch(/input_0/);
					expect(parsed.nodeTemplate).toMatch(/form_input_0/);
					expect(parsed.nodeTemplate).toMatch(/type="number"/);
					expect(parsed.nodeTemplate).toMatch(/step="1"/);
				});

				it('should parse IONode with String EditTextElements', function () {
					var node = {
						"IONode": {
							"nodeName": "199",
							"elements": [
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#SATURATION",
										"type": "String"
									}
								}}]
						}};
					var nodeMap = {'199': node};

					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed).toBeDefined();
					expect(templateCache.get.mostRecentCall.args[0]).toMatch(/ioNodeEditText.html/);
					expect(parsed.nodeTemplate).toMatch(/input_0/);
					expect(parsed.nodeTemplate).toMatch(/form_input_0/);
					expect(parsed.nodeTemplate).toMatch(/type="text"/);
					expect(parsed.nodeTemplate).toMatch(/step="any"/);
				});

				it('should parse IONode with Float EditTextElements', function () {
					var node = {
						"IONode": {
							"nodeName": "199",
							"elements": [
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#SATURATION",
										"type": "Float"
									}
								}}]
						}};
					var nodeMap = {'199': node};

					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed).toBeDefined();
					expect(templateCache.get.mostRecentCall.args[0]).toMatch(/ioNodeEditText.html/);
					expect(parsed.nodeTemplate).toMatch(/input_0/);
					expect(parsed.nodeTemplate).toMatch(/form_input_0/);
					expect(parsed.nodeTemplate).toMatch(/type="number"/);
					expect(parsed.nodeTemplate).toMatch(/step="any"/);
				});
			});

			describe('IONode TwoButtonElement assignment and validation', function () {
				var node, nodeMap, fakeScope;

				beforeEach(function() {
					node = {
						"IONode": {
							"nodeName": "199",
							"elements": [
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#SATURATION",
										"type": "Integer"
									}
								}},
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#PULSE",
										"type": "String"
									}
								}},
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#WEIGHT",
										"type": "Float"
									}
								}},
								{"TwoButtonElement": {
									"leftText": "Undlad",
									"leftNext": "AN_199_CANCEL",
									"leftSkipValidation": true,
									"rightText": "Næste",
									"rightNext": "ANSEV_200_D199",
									"rightSkipValidation": false
								}
							}]
						}
					};
					nodeMap = {'199': node};

					fakeScope = {
						nodeModel: {
							input_0: 1234,
							input_1: '42',
							input_2: 34.56
						},
						outputModel: {}
					};
				});

				it('should assign click action to next button', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed.rightButton.nextNodeId).toBe('ANSEV_200_D199');
					expect(parsed.rightButton.text).toBe('Næste');
					expect(parsed.rightButton.clickAction).toBeDefined();
				});

				it('should assign EditTextElement inputs to output model when next clicked', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					parsed.rightButton.clickAction(fakeScope);

					assertOutputModel(fakeScope);
				});

				it('should not assign values when omit is called', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed.leftButton.nextNodeId).toBe('AN_199_CANCEL');
					expect(parsed.leftButton.text).toBe('Undlad');
					expect(parsed.leftButton.clickAction).not.toBeDefined();
				});

				it('should assign validate action to next button', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed.leftButton.validate).not.toBeDefined();
					expect(parsed.rightButton.validate).toBeDefined();
				});

				it('should invoke all validate actions when next clicked', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					runAndAssertValidationTest(parsed, fakeScope);
				});
			});

            describe('IONode RadioButtonElement assignment and validation', function () {
                var node, nodeMap, fakeScope;

                beforeEach(function() {
                    node = {
                        "IONode": {
                            "nodeName": "152",
                            "elements": [
                                {
                                    "TextViewElement": {
                                        "text": "Test radioknapper",
                                        "header": false
                                    }
                                },
                                {
                                    "RadioButtonElement": {
                                        "choices": [
                                            {
                                                "value": {
                                                    "type": "String",
                                                    "value": "Lilla"
                                                },
                                                "text": "Purple"
                                            },
                                            {
                                                "value": {
                                                    "type": "String",
                                                    "value": "Rød"
                                                },
                                                "text": "Red"
                                            },
                                            {
                                                "value": {
                                                    "type": "String",
                                                    "value": "Blå"
                                                },
                                                "text": "Blue"
                                            }
                                        ],
                                        "outputVariable": {
                                            "name": "152.FIELD",
                                            "type": "String"
                                        }
                                    }
                                },
                                {
                                    "ButtonElement": {
                                        "text": "Næste",
                                        "gravity": "center",
                                        "next": "153",
                                        "skipValidation": false
                                    }
                                }
                            ],
                            "next": "153"
                        }
                    };
                    nodeMap = {'152': node};
                    fakeScope = {
                        nodeModel: {},
                        outputModel: {}
                    };
                });

                it('should assign click action to next button', function () {
                    var parsed = nodesParser.parse('152', nodeMap, {});

                    expect(parsed.centerButton.nextNodeId).toBe('153');
                    expect(parsed.centerButton.text).toBe('Næste');
                    expect(parsed.centerButton.clickAction).toBeDefined();
                });

                it('should return false when validating', function () {
                    var parsed = nodesParser.parse('152', nodeMap, {});
                    fakeScope.form_input_0 = {
                        $dirty: false
                    };
                    expect(parsed.centerButton.validate).toBeDefined();
                    expect(parsed.centerButton.validate(fakeScope)).toBe(false);
                });

                it('should assign RadioButtonElement inputs to output model when next clicked', function () {
                    var parsed = nodesParser.parse('152', nodeMap, {});
                    fakeScope.form_input_0 = {
                        $dirty: true
                    };
                    fakeScope.nodeModel.radioSelected = 'Rød';
                    parsed.centerButton.clickAction(fakeScope);

                    expect(parsed.centerButton.validate(fakeScope)).toBe(true);
                    expect(fakeScope.outputModel['152.FIELD']).toBeDefined();
                    expect(fakeScope.outputModel['152.FIELD'].name).toBe('152.FIELD');
                    expect(fakeScope.outputModel['152.FIELD'].value).toBe('Rød');
                    expect(fakeScope.outputModel['152.FIELD'].type).toBe('String');

                });

            });

			describe('IONode ButtonElement assignment and validation', function () {
				var node, nodeMap, fakeScope;

				beforeEach(function() {
					node = {
						"IONode": {
							"nodeName": "199",
							"elements": [
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#SATURATION",
										"type": "Integer"
									}
								}},
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#PULSE",
										"type": "String"
									}
								}},
								{"EditTextElement": {
									"outputVariable": {
										"name": "199.SAT#WEIGHT",
										"type": "Float"
									}
								}},
								{"ButtonElement": {"text": "Næste", "gravity": "right", "next": "162"}},
								{"ButtonElement": {"text": "Afbryd", "gravity": "left", "next": "163", "skipValidation": true}}
							]}};
					nodeMap = {'199': node};

					fakeScope = {
						nodeModel: {
							input_0: 1234,
							input_1: '42',
							input_2: 34.56
						},
						outputModel: {}
					};
				});

				it('should assign click actions and validation actions to button click', function() {
					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed.rightButton.nextNodeId).toBe('162');
					expect(parsed.rightButton.clickAction).toBeDefined();
					expect(parsed.rightButton.validate).toBeDefined();
				});

				it('should assign to output model when click action is invoked', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					parsed.rightButton.clickAction(fakeScope);

					assertOutputModel(fakeScope);
				});

				it('should invoke all validate actions when next clicked', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					runAndAssertValidationTest(parsed, fakeScope);
				});

				it('should not assign any click actions when skipValidation is true', function () {
					var parsed = nodesParser.parse('199', nodeMap, {});

					expect(parsed.leftButton.nextNodeId).toBe('163');
					expect(parsed.leftButton.clickAction).not.toBeDefined();
					expect(parsed.leftButton.validate).not.toBeDefined();
				});
			});
		});

		var assertOutputModel = function (fakeScope) {
			expect(fakeScope.outputModel['199.SAT#SATURATION']).toBeDefined();
			expect(fakeScope.outputModel['199.SAT#SATURATION'].value).toBe(1234);
			expect(fakeScope.outputModel['199.SAT#SATURATION'].type).toBe('Integer');
			expect(fakeScope.outputModel['199.SAT#SATURATION'].name).toBe('199.SAT#SATURATION');

			expect(fakeScope.outputModel['199.SAT#PULSE']).toBeDefined();
			expect(fakeScope.outputModel['199.SAT#PULSE'].value).toBe('42');
			expect(fakeScope.outputModel['199.SAT#PULSE'].type).toBe('String');
			expect(fakeScope.outputModel['199.SAT#PULSE'].name).toBe('199.SAT#PULSE');

			expect(fakeScope.outputModel['199.SAT#WEIGHT']).toBeDefined();
			expect(fakeScope.outputModel['199.SAT#WEIGHT'].value).toBe(34.56);
			expect(fakeScope.outputModel['199.SAT#WEIGHT'].type).toBe('Float');
			expect(fakeScope.outputModel['199.SAT#WEIGHT'].name).toBe('199.SAT#WEIGHT');
		};

		var runAndAssertValidationTest = function(parsed, fakeScope) {
			fakeScope.form_input_0 = {
				input_0: {
					$valid: true
				}
			};
			fakeScope.form_input_1 = {
				input_1: {
					$valid: false
				}
			};
			fakeScope.form_input_2 = {
				input_2: {
					$valid: true
				}
			};
			expect(parsed.rightButton.validate(fakeScope)).toBe(false);

			fakeScope.form_input_0.input_0.$valid = false;
			fakeScope.form_input_1.input_1.$valid = true;
			expect(parsed.rightButton.validate(fakeScope)).toBe(false);

			fakeScope.form_input_0.input_0.$valid = false;
			fakeScope.form_input_1.input_1.$valid = false;
			expect(parsed.rightButton.validate(fakeScope)).toBe(false);

			fakeScope.form_input_0.input_0.$valid = true;
			fakeScope.form_input_1.input_1.$valid = true;
			expect(parsed.rightButton.validate(fakeScope)).toBe(true);
		};
	});
}());
