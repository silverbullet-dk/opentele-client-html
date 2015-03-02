(function() {
    'use strict';

    var AcknowledgementsPage = function () {
        this.menuButton = element(by.id('menu-button'));
        this.title = element(by.css('.title'));
        this.acknowledgementList = element(by.id('acknowledgement-list'));
        this.acknowledgementMessages = element.all(by.binding('acknowledgement.message'));

        this.get = function () {
            browser.get('index.html#/acknowledgements');
        };

    };

    module.exports = new AcknowledgementsPage();

}());