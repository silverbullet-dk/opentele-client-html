(function() {
    'use strict';

    describe('ChangePasswordCtrl', function () {
        var scope, location, appContext, authentication, runController;

        beforeEach(module('opentele.controllers.changePassword'));
        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function($provide) {
            var authMock = {
                calledWithUser: {},
                calledWithPassword: {},
                calledWithPasswordRepeat: {},
                shouldFailValidation: false,
                shouldFailReLogin: false,
                changePassword: function(user, password, passwordRepeat, onSuccess, onError) {
                    this.calledWithUser = user;
                    this.calledWithPassword = password;
                    this.calledWithPasswordRepeat = passwordRepeat;
                    if (this.shouldFailValidation === true) {
                        onError(422, {code: 'BAD_PASSWORD', message: 'first error,second error'});
                        return;
                    }
                    if (this.shouldFailReLogin === true) {
                        onError(401, {code: 'ACCOUNT_LOCKED'});
                        return;
                    }
                    onSuccess({name: 'bla', password: password, someNewProp: 'bla'});
                }
            };
            $provide.value('authentication', authMock);
        }));

        beforeEach(inject(function($rootScope, $controller, $location, _appContext_, _authentication_){
            scope = $rootScope.$new();
            location = $location;
            appContext = _appContext_;
            authentication = _authentication_;

            appContext.currentUser.set({name: 'bla'});

            runController = function() {
                $controller('ChangePasswordCtrl', {
                    $scope: scope,
                    $location: location,
                    appContext: appContext,
                    authentication: authentication
                });
            };
        }));

        it('should call rest client when submitting new password', function () {
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(authentication.calledWithUser.name).toEqual(appContext.currentUser.get().name);
            expect(authentication.calledWithPassword).toBe('1234');
            expect(authentication.calledWithPasswordRepeat).toBe('1234');
        });

        it('should redirect to menu on successfull change of password', function () {
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(location.path()).toBe('/menu');
        });

        it('should show progress message while waiting for server response', function () {
            var progressWhileChanging = false;
            authentication.changePassword = function(user, password, passwordRepeat, onSuccess, onError) {
                if (scope.model.showProgress === true) {
                    progressWhileChanging = true;
                }
                onSuccess();
            };
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(progressWhileChanging).toBeTruthy();
            expect(scope.model.showProgress).toBeFalsy();
        });

        it('should update current user when password has changed', function () {
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            var updatedUser = appContext.currentUser.get();
            expect(updatedUser.password).toBe('1234');
            expect(updatedUser.someNewProp).toBe('bla');
        });

        it('should show error message when change password failed on server', function () {
            authentication.shouldFailValidation = true;
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(scope.model.errorMessages).toContain('first error');
            expect(scope.model.errorMessages).toContain('second error');
        });

        it('should be possible to change inputted password on errors', function () {
            authentication.shouldFailValidation = true;
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(scope.model.showProgress).toBeFalsy();
        });

        it('should be possible to get error when re-submitting login credentials', function () {
            authentication.shouldFailReLogin = true;
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            scope.submit();

            expect(scope.model.showProgress).toBeFalsy();
            expect(scope.model.errorMessages.length).toBe(1);
            expect(scope.model.errorMessages).toMatch(/locked/);
        });

        it('should mark form valid when everything is ok', function () {
            runController();

            scope.model.password = '1234';
            scope.model.passwordRepeat = '1234';

            expect(scope.formInvalid()).toBeFalsy();
        });

        it('should mark form invalid when nothing has been entered', function () {
            runController();

            expect(scope.formInvalid()).toBeTruthy();
        });

        it('should mark form invalid when repeat password is missing', function () {
            runController();

            scope.model.password = '1234';

            expect(scope.formInvalid()).toBeTruthy();
        });

        it('should mark form invalid when password is missing', function () {
            runController();

            scope.model.passwordRepeat = '1234';

            expect(scope.formInvalid()).toBeTruthy();
        });

        it('should mark for invalid when passwords does not match', function () {
            runController();
            scope.model.password = '1234';
            scope.model.passwordRepeat = '12345';

            scope.submit();

            expect(scope.model.errorMessages).toContain('Passwords do not match');
        });
    });
}());
