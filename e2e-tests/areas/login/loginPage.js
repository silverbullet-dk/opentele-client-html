(function () {
    'use strict';

    var LoginPage = function () {
        this.loginForm = element(by.id('login-form'));
        this.username = element(by.id('username'));
        this.password = element(by.id('password'));
        this.submit = element(by.id('submit'));
        this.errorMessage = element(by.binding('model.errorMessage'));
        this.logoutButton = element(by.id('logout-button'));

        this.get = function () {
            browser.get('index.html');
        };

        this.setUsername = function (name) {
            this.username.clear();
            this.username.sendKeys(name);
        };

        this.setPassword = function (pwd) {
            this.password.clear();
            this.password.sendKeys(pwd);
        };

        this.doLogin = function (username, password) {
            this.setUsername(username);
            this.setPassword(password);
            this.submit.click();
        };

        this.doLogout = function () {
            this.logoutButton.click();
        };
    };

    module.exports = new LoginPage();

}());
