(function() {
    'use strict';

    describe('messages', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var messagesPage = require("./messagesPage.js");

        describe('when authenticated', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                menuPage.toMessages();
            });

            it('should navigate to messages page', function() {
                expect(browser.getLocationAbsUrl()).toMatch("/messages");
                expect(messagesPage.title.getText()).toMatch('Messages');
                expect(messagesPage.threadList).toBeDefined();
            });

            it('should show list of thread names', function() {
                messagesPage.threadNames.then(function(names) {
                    expect(names.length).toEqual(3);
                    expect(names[0].getText()).toMatch(/Obstetrisk/i);
                    expect(names[1].getText()).toMatch(/TCN/i);
                    expect(names[2].getText()).toMatch(/Afdeling-B/i);
                });
            });

            it ('should redirect to thread page when thread clicked', function() {
                messagesPage.toThread(2);
                expect(browser.getLocationAbsUrl()).toMatch(/\/thread/);
            });

        });

        describe('patient with only one thread available', function() {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('rene', '1234');
            });

            it('should automatically redirect to thread', function () {
                menuPage.toMessages();
                expect(browser.getLocationAbsUrl()).toMatch(/\/thread/);
            });
        });

        describe('when authenticated with no recipients', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('messagesNoRecipients', '1234');
            });

            it('should see no messages page', function() {
                menuPage.menuItems.then(function(names) {
                    expect(names.indexOf('Messages')).toEqual(-1);
                });
            });
        });

    });
}());