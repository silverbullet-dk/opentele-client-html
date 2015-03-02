(function() {
    'use strict';

    var DecisionNodePage = function() {
		var questionnairePage = require('../questionnairePage.js');

        this.enterSystolicValue = function(value) {
            element(by.model('nodeModel.input_0')).sendKeys(value);
        };

		this.enterDiastolicValue = function(value) {
			element(by.model('nodeModel.input_1')).sendKeys(value);
		};

		this.enterPulseValue = function(value) {
			element(by.model('nodeModel.input_2')).sendKeys(value);
		};

		this.clickYes = function() {
			questionnairePage.clickRightButton();
		};

		this.clickNo = function() {
			questionnairePage.clickLeftButton();
		};
    };

    module.exports = new DecisionNodePage();
}());
