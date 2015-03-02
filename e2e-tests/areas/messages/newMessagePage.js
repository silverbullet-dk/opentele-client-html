(function() {
    'use strict';

    var NewMessagePage = function () {
        this.backButton = element(by.id('back-button'));
        this.menuButton = element(by.id('menu-button'));
        this.title = element(by.css('.title'));
        this.pageTitle = element(by.css('h2'));
        this.errorMessage = element(by.binding('model.errorMessage'));
        this.form = element(by.id('new-message-form'));
        this.inputTopicErrorMessage = element(by.id('input-topic-error-message'));
        this.inputMessageErrorMessage = element(by.id('input-message-error-message'));
        this.message = element(by.id('message'));
        this.submit = element(by.id('submit'));

        this.setMessage = function(message) {
            this.message.clear();
            this.message.sendKeys(message);
        };

        this.doSend = function(message) {
            this.setMessage(message);
            this.submit.click();
        };

    };

    module.exports = new NewMessagePage();

}());
