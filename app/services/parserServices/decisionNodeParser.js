(function() {
    'use strict';

    angular.module('opentele.parserServices.decisionNodeParser', [])
        .service('decisionNodeParser', function(nodesParser) {
 			return function(node, nodeMap, outputModel) {
				var getOperator = function() {
					var operator;
					for (var op in node.expression) {
						operator = op;
						break;
					}

					if (operator !== 'lt' && operator !== 'gt' && operator !== 'eq') {
						throw new Error('Unsupported operator: ' + operator);
					}

					return operator;
				};

				var getValueAndType = function(side) {
					var valueAndType;
					if (side.type === 'name') {
						valueAndType = {
							value: outputModel[side.value].value,
							type: outputModel[side.value].type
						};
					} else {
						valueAndType =  {
							value: side.value,
							type: side.type
						};
					}

					if (['Integer', 'Float', 'Boolean'].indexOf(valueAndType.type) < 0) {
						throw new Error('Type not supported: ' + valueAndType.type);
					}

					return valueAndType;
				};

				var evaluate = function(operator, left, right) {
					if (left.type !== right.type) {
						throw new TypeError('Type for left and right side must be the same. Left: ' +
											 left.type + ', right: ' + right.type);
					}

					switch (operator) {
						case 'lt':
							if (left.type === 'Boolean') {
								throw new TypeError('Boolean expression with operators other than eq not supported.');
							}
							return left.value < right.value;
						case 'gt':
							if (left.type === 'Boolean') {
								throw new TypeError('Boolean expression with operators other than eq not supported.');
							}
							return left.value > right.value;
						case 'eq':
							return left.value === right.value;
					}
				};

				var operator = getOperator();
				var left = getValueAndType(node.expression[operator].left);
				var right = getValueAndType(node.expression[operator].right);
				var isTrue = evaluate(operator, left, right);
				var nextNodeId = isTrue === true ? node.next : node.nextFalse;

				return nodesParser.parse(nextNodeId, nodeMap, outputModel);
			};
        });
}());
