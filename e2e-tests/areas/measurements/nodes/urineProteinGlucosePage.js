(function() {
	'use strict';

	var UrineProteinGlucosePage = function() {

		this.checkPlusOne = function(value) {
			element(by.id('radio-2')).click();
		};
	};

	module.exports = new UrineProteinGlucosePage();
}());
