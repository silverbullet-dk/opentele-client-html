(function() {
    'use strict';

    describe('translations', function() {
        var loginPage = require("./login/loginPage.js");
        var menuPage = require("./menu/menuPage.js");
        var performMeasurementsPage = require("./measurements/performMeasurementsPage.js");
        var messagesPage = require("./messages/messagesPage.js");
        var threadPage = require("./messages/threadPage.js");

        beforeEach(function() {
            loginPage.get();
        });

        it('should default to use en-US dictionary', function() {
            expect(loginPage.submit.getAttribute('value')).toBe("Login");
        });

        it('should switch to da-DK when changing dictionary', function() {
            browser.executeScript('window.navigator.userLanguage="da-DK"');
            loginPage.setUsername('foo');
            expect(loginPage.submit.getAttribute('value')).toBe("Log på");
        });

        it('should preserve da-DK dict across pages #1', function() {
            browser.executeScript('window.navigator.userLanguage="da-DK"');
            loginPage.doLogin("nancyann", "abcd1234");

            menuPage.menuItems.then(function(items) {
                var performMeasurementsLink = items[0];
                expect(performMeasurementsLink.getText()).toBe('Gennemfør målinger');
            });
        });

        it('should preserve da-DK dict across pages #2', function() {
            browser.executeScript('window.navigator.userLanguage="da-DK"');
            loginPage.doLogin("nancyann", "abcd1234");

            menuPage.menuItems.then(function(items) {
                var performMeasurementsLink = items[0];
                performMeasurementsLink.click();
                expect(performMeasurementsPage.title.getText()).toBe('Gennemfør målinger');
            });
        });

        it('should not be able to overwrite with an invalid dictionary', function() {
            browser.executeScript('window.navigator.userLanguage="foo-BAR"');
            loginPage.doLogin("nancyann", "abcd1234");

            menuPage.menuItems.then(function(items) {
                expect(items[0].getText()).toBe('Perform measurements');
            });
        });

        it('should use da-DK date formatting', function() {
            browser.executeScript('window.navigator.userLanguage="da-DK"');
            loginPage.doLogin("nancyann", "abcd1234");
            menuPage.menuItems.then(function(items) {
                var messagesLink = items[1];
                messagesLink.click();
                var afdelingBTestThread = 2;
                messagesPage.toThread(afdelingBTestThread);
                threadPage.messageItems.then(function(messages) {
                    messages[0].getText().then(function(text) {
                        expect(text).toMatch(/17\/12\/2013/);
                    });
                    messages[1].getText().then(function(text) {
                        expect(text).toMatch(/19\/12\/2013/);
                    });
                });

            });
        });

    });
}());
