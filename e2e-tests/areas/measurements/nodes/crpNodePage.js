(function() {
    'use strict';

    var CrpNodePage = function() {

        this.heading = element(by.binding('nodeModel.heading'));

        this.enterCrpValue = function (value) {
            element(by.model('nodeModel.crpCountMeasurement')).sendKeys(value);
        };

        this.checkLt5 = function () {
            element(by.model('nodeModel.crpLt5Measurement')).click();
        };

    };

    module.exports = new CrpNodePage();
}());
