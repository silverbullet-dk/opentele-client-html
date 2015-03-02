(function() {
    'use strict';

    var SimpleInputPage = function() {

        this.enterValue = function(value) {
            element(by.model('nodeModel.measurement')).sendKeys(value);
        };
    };

    module.exports = new SimpleInputPage();
}());
