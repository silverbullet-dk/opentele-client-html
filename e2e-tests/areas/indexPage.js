(function () {
    'use strict';

    var IndexPage = function () {
        this.mainMenuButton = element(by.id('menu-button'));

        this.get = function () {
            browser.get('index.html');
        };
    };

    module.exports = new IndexPage();
}());
