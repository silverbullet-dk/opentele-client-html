(function () {
    'use strict';

    describe('error scenarios', function () {
        var loginPage = require("../login/loginPage.js");

        afterEach(function () {
            browser.clearMockModules();
            browser.refresh();
        });

        describe('server unavailable', function () {
            var mockServerInfo = function () {
                var serverInfoService = angular.module('opentele.restApiServices.serverInfo', []);
                serverInfoService.service('serverInfo', function () {
                    return {
                        get: function (onSuccess, onError) {
                            onError();
                        }
                    };
                });
            };

            beforeEach(function () {
                browser.addMockModule('opentele.restApiServices.serverInfo', mockServerInfo);
            });

            it('should show message stating that server is unavailable instead of login form', function () {
                loginPage.get();

                expect(loginPage.loginForm.isDisplayed()).toBe(false);
                expect(loginPage.errorMessage.getText()).toMatch(/not connect to server/);
            });
        });

        describe('show error page on exceptions', function () {
            var mockRestClient = function () {
                var authenticationService = angular.module('opentele.restApiServices.authentication', []);
                authenticationService.service('authentication', function () {
                    return {
                        login: function (username, password, onSuccess, onError) {
                            throw new Error('Wrong something');
                        },
                        logout: function (onSuccess) {
                            onSuccess();
                        }
                    };
                });
            };

            beforeEach(function () {
                browser.addMockModule('opentele.restApiServices.authentication', mockRestClient);
            });

            it('should redirect to error page when exception is left unhandled', function () {
                loginPage.get();
                loginPage.doLogin("nancyann", "abcd1234"); // will throw exception from mock rest client.

                expect(browser.getLocationAbsUrl()).toMatch(/\/error/);
            });

        });

        describe('show error page on server errors', function () {
            var menuPage = require("../menu/menuPage.js");

            it('should redirect to error page when server responds with error status', function () {
                loginPage.get();
                loginPage.doLogin("measurements500", "1234");

                menuPage.toMeasurements();

                expect(browser.getLocationAbsUrl()).toMatch(/\/error/);
            });
        });
    });
}());
