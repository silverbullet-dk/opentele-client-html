(function() {
    'use strict';

    describe('show new message', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var messagesPage = require("./messagesPage.js");
        var threadPage = require("./threadPage.js");
        var newMessagePage = require("./newMessagePage.js");

        describe('when authenticated', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                menuPage.toMessages();
                messagesPage.toThread(2);
                threadPage.toNewMessage();
            });

            it('should navigate to new message page', function() {
                expect(browser.getLocationAbsUrl()).toMatch("/newMessage");
                expect(newMessagePage.pageTitle.getText()).toEqual("New message");
                expect(newMessagePage.form).toBeDefined();
            });

            it('should show that message is required after being dirty', function() {
                newMessagePage.setMessage('message');
                newMessagePage.setMessage('');
                expect(newMessagePage.inputMessageErrorMessage.getText()).toEqual('Message required');
                expect(newMessagePage.submit.isEnabled()).toEqual(false);
            });

            it('should be able to send message when message is set', function() {
                newMessagePage.setMessage('message');
                expect(newMessagePage.submit.isEnabled()).toEqual(true);
            });

            it('should redirect to thread page after successfully sending new message', function() {
                newMessagePage.doSend('message');
                expect(browser.getLocationAbsUrl()).toMatch("/thread");
            });

            it('should redirect back to thread page when pressing back button', function() {
                newMessagePage.backButton.click();
                expect(browser.getLocationAbsUrl()).toMatch(/\/thread/);
            });

        });

        describe('when authenticated but cannot send new messages', function() {

            beforeEach(function () {
                loginPage.get();
                loginPage.doLogin('messagesNoNewMessage', '1234');
                menuPage.toMessages();
                messagesPage.toThread(2);
                threadPage.toNewMessage();
            });

            it('should not redirect but display error message', function () {
                newMessagePage.doSend('message');
                expect(browser.getLocationAbsUrl()).toMatch("/newMessage");
                expect(newMessagePage.errorMessage.getText()).toEqual("Failed to send message.");
            });

        });

    });
}());
