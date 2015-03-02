(function() {
    'use strict';

    describe('show thread', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var messagesPage = require("./messagesPage.js");
        var threadPage = require("./threadPage.js");

        describe('when authenticated', function() {

            beforeEach(function () {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                menuPage.toMessages();
                messagesPage.toThread(2);
            });

            it('should navigate to thread page', function () {
                expect(browser.getLocationAbsUrl()).toMatch("/thread");
                expect(threadPage.threadName.getText()).toEqual("Afdeling-B Test");
                expect(threadPage.messageList).toBeDefined();
            });

            it('should show list of message items', function () {
                threadPage.messageItems.then(function (messages) {
                    expect(messages.length).toEqual(4);
                    messages[0].getText().then(function (text) {
                        expect(text).toMatch(/12\/17\/2013/);
                    });
                    messages[1].getText().then(function (text) {
                        expect(text).toMatch(/12\/19\/2013/);
                        expect(text).toMatch(/Test/);
                    });
                    messages[2].getText().then(function (text) {
                        expect(text).toMatch(/tredje besked/);
                        expect(text).toMatch(/12\/21\/2013/);
                        expect(text).toMatch(/stadig test/);
                    });
                    messages[3].getText().then(function (text) {
                        expect(text).toMatch(/sidste besked/);
                        expect(text).toMatch(/12\/24\/2013/);
                        expect(text).toMatch(/sidste test/);
                    });
                });
            });

            it('should redirect to new message page when button clicked', function () {
                threadPage.toNewMessage();
                expect(browser.getLocationAbsUrl()).toMatch(/\/newMessage/);
            });

            it('should redirect back to messages page when pressing back button', function () {
                threadPage.backButton.click();
                expect(browser.getLocationAbsUrl()).toMatch(/\/messages/);
            });

        });

        describe('when authenticated with no messages', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('messagesNoMessages', '1234');
                menuPage.toMessages();
                messagesPage.toThread(2);
            });

            it('should see no messages message', function() {
                expect(browser.getLocationAbsUrl()).toMatch("/thread");
                expect(threadPage.noMessages.getText()).toMatch(/read and write messages/);
            });
        });

    });
}());