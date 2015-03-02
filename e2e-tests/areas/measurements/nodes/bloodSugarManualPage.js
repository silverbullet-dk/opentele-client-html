(function() {
	'use strict';

	var BloodSugarManualPage = function () {
		this.enterBloodSugarValue = function (value) {
			element(by.model('nodeModel.bloodSugarManualMeasurement')).sendKeys(value);
		};

		this.checkBeforeMeal = function () {
			element(by.model('nodeModel.bloodSugarManualBeforeMeal')).click();
		};

	};

	module.exports = new BloodSugarManualPage();
}());
