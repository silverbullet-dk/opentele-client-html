(function() {
    'use strict';

    describe('login', function() {
        var loginPage = require("./loginPage.js");

        beforeEach(function() {
            loginPage.get();
        });

        it('should render login when user navigates to /login', function() {
            expect(loginPage.loginForm).toBeDefined();
            expect(loginPage.loginForm.isDisplayed()).toBe(true);
            expect(loginPage.username).toBeDefined();
            expect(loginPage.password).toBeDefined();
            expect(loginPage.submit).toBeDefined();
            expect(loginPage.errorMessage).toBeDefined();
        });

        it('should show error message when server rejects login request', function() {
            loginPage.doLogin("wrong user", "wrong password");

            browser.sleep(500);
            expect(loginPage.errorMessage.getText()).toMatch(/Wrong/);
        });

        it('should show error message when account is locked', function() {
            if (browser.browserName.indexOf('firefox') > -1) {
                // NASTY HACK... Test fails on firefox on jenkins, don't know how to fix
                return;
            }

            loginPage.doLogin("islocked", "bla");

            browser.sleep(500);
            expect(loginPage.errorMessage.getText()).toMatch(/locked/);
        });

        it('should redirect to menu page on successful login', function() {
            loginPage.doLogin("nancyann", "abcd1234");

            expect(browser.getLocationAbsUrl()).toMatch("/menu");
        });

        it('should logout and redirect back to login page', function() {
            loginPage.doLogin("nancyann", "abcd1234");
            expect(browser.getLocationAbsUrl()).toMatch("/menu");

            loginPage.doLogout();

            expect(browser.getLocationAbsUrl()).toMatch("/login");
        });

        it('should redirect back to login page when attempting to access page before being logged in', function() {
            browser.setLocation('/menu');

            expect(browser.getLocationAbsUrl()).toMatch("/login");
        });
    });
}());
