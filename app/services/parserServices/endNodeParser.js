(function() {
    'use strict';

    angular.module('opentele.parserServices.endNodeParser', [])
    	.service('endNodeParser', function() {
    		return function(node) {
    			return {
    				isEndNode: true
    			};
    		};
    	});
}());
