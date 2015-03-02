(function() {
    'use strict';

    angular.module('opentele.parserServices.ioNodeParser', [])
        .service('ioNodeParser', function($templateCache, parserUtils) {
            return function(node) {
                var elementTemplates = [];
                var labels = [];
                var clickActions = [];
                var validateActions = [];
                var representation = {
                    nodeModel: {}
                };

                var setupClickActions = function(skipValidation, buttonRepresentation) {
                    if (skipValidation === true) {
                        return;
                    }
                    buttonRepresentation.clickAction = function(scope) {
                        for (var i = 0; i < clickActions.length; i++) {
                            clickActions[i](scope);
                        }
                    };
                    buttonRepresentation.validate = function(scope) {
                        for (var i = 0; i < clickActions.length; i++) {
                            if (validateActions[i](scope) === false) {
                                return false;
                            }
                        }
                        return true;
                    };
                };

                var handleTextViewElement = function(element, representation, elementIndex, allElements) {
                    labels.push(element.text);
                };

                var handleEditTextElement = function(element, representation) {
                    var template = parserUtils.getNodeTemplate('ioNodeEditText.html');
                    var editFieldName = 'input_' + elementTemplates.length;
                    var formName = 'form_' + editFieldName;
                    template = parserUtils.replaceAll(template, '#type#', element.outputVariable.type ===
                        'String' ? 'text' : 'number');
                    template = parserUtils.replaceAll(template, '#step#', element.outputVariable.type ===
                        'Integer' ? '1' : 'any');
                    template = parserUtils.replaceAll(template, '#form_name#', formName);
                    template = parserUtils.replaceAll(template, '#input_name#', editFieldName);

                    var labelText = labels.length > 0 ? labels.pop() : '';
                    template = parserUtils.replaceAll(template, '#label#', labelText);

                    elementTemplates.push(template);

                    clickActions.push(function(scope) {
                        var variableName = element.outputVariable.name;
                        scope.outputModel[variableName] = {
                            name: variableName,
                            value: scope.nodeModel[editFieldName],
                            type: element.outputVariable.type
                        };
                    });

                    validateActions.push(function(scope) {
                        return scope[formName][editFieldName].$valid;
                    });
                };

                var handleTwoButtonElement = function(element, representation) {
                    var left = {
                        text: element.leftText,
                        nextNodeId: element.leftNext
                    };
                    setupClickActions(element.leftSkipValidation, left);
                    representation.leftButton = left;

                    var right = {
                        text: element.rightText,
                        nextNodeId: element.rightNext
                    };
                    setupClickActions(element.rightSkipValidation, right);
                    representation.rightButton = right;
                };

                var handleButtonElement = function(element, representation) {
                    var buttonRepresentation = {
                        text: element.text,
                        nextNodeId: element.next
                    };
                    setupClickActions(element.skipValidation, buttonRepresentation);

                    switch (element.gravity) {
                        case "center":
                            representation.centerButton = buttonRepresentation;
                            break;
                        case "right":
                            representation.rightButton = buttonRepresentation;
                            break;
                        case "left":
                            representation.leftButton = buttonRepresentation;
                            break;
                    }
                };

                var handleRadioButtonElement = function(element, representation) {
                    var template = parserUtils.getNodeTemplate('ioNodeRadioButton.html');
                    var radioButtonName = 'input_' + elementTemplates.length;
                    var formName = 'form_' + radioButtonName;
                    representation.nodeModel.radioItems = element.choices.map(function(choice) {
                        return { label: choice.text, value: choice.value.value };
                    });
                    template = parserUtils.replaceAll(template, '#form_name#', formName);
                    elementTemplates.push(template);

                    clickActions.push(function(scope) {
                        var variableName = element.outputVariable.name;
                        scope.outputModel[variableName] = {
                            name: variableName,
                            value: scope.nodeModel.radioSelected,
                            type: element.outputVariable.type
                        };
                    });

                    validateActions.push(function(scope) {
                        return scope[formName].$dirty;
                    });
                };

                var elementHandlers = {
                    TextViewElement: function(element, representation, elementIndex, allElements) {
                        handleTextViewElement(element, representation, elementIndex, allElements);
                    },
                    EditTextElement: function(element, representation) {
                        handleEditTextElement(element, representation);
                    },
                    ButtonElement: function(element, representation) {
                        handleButtonElement(element, representation);
                    },
                    TwoButtonElement: function(element, representation) {
                        handleTwoButtonElement(element, representation);
                    },
                    RadioButtonElement: function(element, representation) {
                        handleRadioButtonElement(element, representation);
                    }
                };

                for (var i = 0; i < node.elements.length; i++) {
                    var element = node.elements[i];
                    var elementName = parserUtils.getNodeType(element);
                    var handler = elementHandlers[elementName];
                    handler(element[elementName], representation, i, node.elements);
                }

                // All TextViewElement labels not matched to input field is set as heading.
                elementTemplates.unshift(labels.map(function(label) {
                    var template = parserUtils.getNodeTemplate('ioNodeText.html');
                    return parserUtils.replaceAll(template, '#heading#', label);
                }));
                representation.nodeTemplate = elementTemplates.join('\n');

                return representation;
            };
        });
}());
