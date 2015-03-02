(function() {
    'use strict';

    angular.module('opentele.parserServices.haemoglobinDeviceNodeParser', [])
        .service('haemoglobinDeviceNodeParser', function(parserUtils) {
            return function(node) {
                return parserUtils.parseSimpleInputNode(node, node.haemoglobinValue, 'HAEMOGLOBIN');
            };
        });
}());
