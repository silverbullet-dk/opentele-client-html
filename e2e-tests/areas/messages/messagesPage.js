(function() {
    'use strict';

    var MessagesPage = function () {
        this.menuButton = element(by.id('menu-button'));
        this.title = element(by.css('.title'));
        this.threadList = element(by.id('thread-list'));
        this.threadNames = element.all(by.binding('threadRef.name'));

        this.get = function () {
            browser.get('index.html#/messages');
        };

        this.toThread = function (index) {
            element.all(by.id('thread-items')).
                get(index).
                $('a').
                click();
        };
    };

    module.exports = new MessagesPage();

}());
