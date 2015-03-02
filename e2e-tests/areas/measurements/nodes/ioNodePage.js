(function() {
	'use strict';

	var IONodePage = function () {
		this.headings = element.all(by.css('h2'));

		this.enterSaturationValue = function (value) {
			element(by.model('nodeModel.input_0')).sendKeys(value);
		};

		this.enterPulseValue = function (value) {
			element(by.model('nodeModel.input_1')).sendKeys(value);
		};

		this.enterHealthText = function (value) {
			element(by.model('nodeModel.input_2')).sendKeys(value);
		};

        this.selectRadioButton = function(index) {
            element.all(by.id('radio-items')).
                get(index).
                click();
        };
	};

	module.exports = new IONodePage();

}());
