(function() {
    'use strict';

    var DelayNodePage = function() {

        this.heading = element(by.binding('nodeModel.heading'));
        this.timerDescription = element(by.binding('nodeModel.timerDescription'));

    };

    module.exports = new DelayNodePage();
}());
