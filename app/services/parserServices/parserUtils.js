(function() {
    'use strict';

    angular.module('opentele.parserServices.utils', [])
	.service('parserUtils', function($templateCache) {
		return {
			getFirstKeyFromLiteral: function (literal) {
				for (var key in literal) {
					if (literal.hasOwnProperty(key)) {
						return key;
					}
				}
			},
			getNodeType: function (node) {
				return this.getFirstKeyFromLiteral(node);
			},
			getNodeTemplate: function(templateName) {
				var template = $templateCache.get('services/parserServices/nodeTemplates/' + templateName);
				if (typeof template == 'undefined') {
					throw new Error('HTML template does not exist for ' + templateName);
				}
				return template;
			},
			replaceAll: function(string, find, replace) {
				var escapeRegExp = function(string) {
					return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
				};
				return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
			},
            parseSimpleInputNode: function(node, nodeValueEntry, fieldName) {
                var isIntegerNode = nodeValueEntry.type === 'Integer';

                var template = this.getNodeTemplate('simpleInputNode.html');
                template = this.replaceAll(template, '#field_name#', fieldName);
                var numberPattern = isIntegerNode === true ? /^\d+$/ : /.+/;
                template = this.replaceAll(template, '#pattern#', numberPattern);

                var representation = {
                    nodeTemplate: template,
                    nodeModel: {
                        heading: node.text
                    }
                };

                representation.rightButton = {
                    text: "Next",
                    nextNodeId: node.next,
                    validate: function(scope) {
                        return scope.inputForm.value.$valid;
                    },
                    clickAction: function(scope) {
                        var nodeName = nodeValueEntry.name;
                        scope.outputModel[nodeName] = {
                            name: nodeName,
                            type: nodeValueEntry.type,
                            value: scope.nodeModel.measurement
                        };
                    }
                };

                representation.leftButton = {
                    text: "Omit",
                    nextNodeId: node.nextFail
                };

                return representation;
            }

		};
	});
}());
