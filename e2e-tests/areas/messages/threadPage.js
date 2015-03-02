(function() {
    'use strict';

    var ThreadPage = function () {
        this.backButton = element(by.id('back-button'));
        this.menuButton = element(by.id('menu-button'));
        this.threadName = element(by.binding('model.thread.name'));
        this.noMessages = element(by.id('no-messages'));
        this.messageList = element(by.id('message-list'));
        this.messageItems = element.all(by.id('message-items'));
        this.newMessageButton = element(by.id('new-message-button'));

        this.toNewMessage = function (index) {
            this.newMessageButton.click();
        };

    };

    module.exports = new ThreadPage();

}());