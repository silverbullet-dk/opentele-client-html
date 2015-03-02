(function() {
    'use strict';

    describe('menu', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var performMeasurementsPage = require("../measurements/performMeasurementsPage.js");

        beforeEach(function() {
            loginPage.get();
        });

        it('should automatically redirect to /login when user is not logged in', function() {
            expect(browser.getLocationAbsUrl()).toMatch("/login");
        });

        it('should render menu when user navigates to /menu', function() {
            loginPage.doLogin("nancyann", "abcd1234");

            expect(menuPage.menuList).toBeDefined();
        });

        it('should redirect back to menu when clicking the main menu button in a submenu', function() {
            loginPage.doLogin("nancyann", "abcd1234");
            menuPage.menuItems.then(function(items) {
                var performMeasurementsLink = items[0];
                performMeasurementsLink.click();
                browser.getLocationAbsUrl().then(function(url) {
                    var suffix = "/perform_measurements";
                    var suffixCheck = url.indexOf(suffix, url.length - suffix.length) !== -1;
                    expect(suffixCheck).toEqual(true);

                    var mainMenuButton = performMeasurementsPage.menuButton;
                    mainMenuButton.click();
                    browser.getLocationAbsUrl().then(function(url) {
                        suffix = "/menu";
                        suffixCheck = url.indexOf(suffix, url.length - suffix.length) !== -1;
                        expect(suffixCheck).toEqual(true);
                        suffixCheck = url.indexOf(suffix, url.length - suffix.length) !== -1;
                        expect(suffixCheck).toEqual(true);
                    });
                });
            });
        });

        it('should navigate to perform measurements page when menu item is clicked', function() {
            loginPage.doLogin("nancyann", "abcd1234");

            menuPage.toMeasurements();

            expect(browser.getLocationAbsUrl()).toMatch(/.*\/perform_measurement/i);
        });

        it('should navigate to change password page when menu item is clicked', function() {
            loginPage.doLogin('nancyann', 'abcd1234');

            menuPage.toChangePassword();

            expect(browser.getLocationAbsUrl()).toMatch(/.*\/change_password/i);
        });
    });
}());
