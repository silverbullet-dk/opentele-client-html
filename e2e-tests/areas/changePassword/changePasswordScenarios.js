(function() {
    'use strict';
    describe('change password', function() {
        var indexPage = require("../indexPage.js");
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var changePasswordPage = require("./changePasswordPage.js");
        var measurementsPage = require("../measurements/performMeasurementsPage.js");

        describe('change password manually', function() {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('changepw', '1234');
                menuPage.toChangePassword();
            });

            it('should disable change button when nothing has been entered', function () {
                expect(changePasswordPage.submit.isEnabled()).toBeFalsy();
            });

            it('should disable change button when mismatching passwords entered', function () {
                changePasswordPage.setNewPassword('abcd1234');
                changePasswordPage.setNewPasswordRepeat('abcd1234_5');

                changePasswordPage.submit.click();

                changePasswordPage.errorMessages.then(function(items)
                {
                    expect(items[0].getText()).toMatch(/do not match/);
                });
            });

            it('should enable change button when passwords match', function () {
                changePasswordPage.setNewPassword('abcd1234');
                changePasswordPage.setNewPasswordRepeat('abcd1234');

                expect(changePasswordPage.submit.isEnabled()).toBeTruthy();
            });

            it('should be able to submit changes when passwords match', function () {
                changePasswordPage.doChange('12345678');

                browser.sleep(1000);
                expect(browser.getLocationAbsUrl()).toMatch(/\/menu/);
            });
        });

        describe('change password error message handling', function () {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('changepwfails', '1234');
                menuPage.toChangePassword();
            });

            it('should show error message when server validation fails', function () {
                changePasswordPage.doChange('1234');

                browser.sleep(1000);
                changePasswordPage.errorMessages.then(function(items)
                {
                    expect(items[0].getText()).toMatch(/password too short/);
                    expect(items[1].getText()).toMatch(/must contain one digit/);
                });
            });
        });

        describe('forced change password', function () {
            it('should redirect directly to change password page when password must be changed', function() {
                loginPage.get();
                loginPage.doLogin('mustchangepw', '1234');

                expect(browser.getLocationAbsUrl()).toMatch(/\/change_password/);
                expect(loginPage.logoutButton).toBeDefined();
                expect(indexPage.mainMenuButton.isDisplayed()).toBeFalsy();
            });
        });
    });
}());
