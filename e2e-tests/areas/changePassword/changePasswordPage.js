(function () {
    'use strict';

    var ChangePasswordPage = function () {
        this.changePasswordForm = element(by.id('change-password-form'));
        this.newPassword = element(by.id('new-password'));
        this.newPasswordRepeat = element(by.id('new-password-repeat'));
        this.submit = element(by.id('submit'));
        this.errorMessages = element.all(by.id('error-messages'));
        this.required = element(by.id('required'));

        this.setNewPassword = function (pw) {
            this.newPassword.clear();
            this.newPassword.sendKeys(pw);
        };

        this.setNewPasswordRepeat = function (pw) {
            this.newPasswordRepeat.clear();
            this.newPasswordRepeat.sendKeys(pw);
        };

        this.doChange = function (newPassword) {
            this.setNewPassword(newPassword);
            this.setNewPasswordRepeat(newPassword);
            this.submit.click();
        };
    };

    module.exports = new ChangePasswordPage();
}());
