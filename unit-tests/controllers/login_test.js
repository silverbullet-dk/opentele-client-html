(function () {
    'use strict';

    describe('opentele.controllers.login module', function () {

        beforeEach(module('opentele.controllers.login'));

        describe('loginCtrl tests', function () {
            var scope, location, translate, appContext, authentication, headerEnabled, serverInfo,
                runController;

            module('opentele.stateServices');

            // mock services
            beforeEach(module(function ($provide) {
                var reminders = {
                    update: function (user, onSuccess) {
                    }
                };
                $provide.value('reminders', reminders);

                headerEnabled = {
                    set: function (val) {}
                };
                authentication = {
                    setError: false,
                    errorStatus: 401,
                    errorReason: 'BAD_CREDENTIALS',
                    login: function (patientUrl, username, password, success, error) {
                        if (this.setError === false) {
                            success({
                                'showRealtimeCTG': true
                            });
                        } else {
                            error(this.errorStatus, {code: this.errorReason});
                        }
                    },
                    logoutCalled: false,
                    logout: function (onSuccess) {
                        this.logoutCalled = true;
                        onSuccess();
                    }
                };
                serverInfo = {
                    get: function (onSuccess, onError) {
                        onSuccess(
                            {
                                links: {
                                    self: 'some/url'
                                }
                            });
                    }
                };

                $provide.value('headerEnabled', headerEnabled);
                $provide.value('authentication', authentication);
                $provide.value('serverInfo', serverInfo);
            }));

            // instantiate controller
            beforeEach(inject(function ($rootScope, $translate, $location, $controller, _appContext_,
                _headerEnabled_, _authentication_, _reminders_) {
                scope = $rootScope.$new();
                location = $location;
                translate = $translate;
                appContext = _appContext_;
                runController = function () {
                    $controller('LoginCtrl', {
                        '$scope': scope,
                        '$location': location,
                        '$translate': translate,
                        'appContext': appContext,
                        'reminders': _reminders_,
                        'authentication': _authentication_,
                        'headerEnabled': _headerEnabled_
                    });
                };
            }));

            it('should have a new path', function () {
                runController();
                scope.model = {
                    'username': 'nancyann',
                    'password': 'abcd1234'
                };

                scope.submit();

                expect(location.path()).toEqual("/menu");
            });

            it('should clear password when initializing page', function () {
                scope.model = {
                    'username': 'nancyann',
                    'password': 'abcd1234'
                };

                runController();

                expect(scope.model.username).toBe('nancyann');
                expect(scope.model.password).toBe('');
            });

            it('should show error message on failed login', function () {
                authentication.setError = true;
                runController();
                scope.model = {
                    'username': 'nancyann',
                    'password': 'abcd1234'
                };
                scope.submit();

                expect(scope.model.errorMessage).toEqual("Wrong username or password");
            });

            it('should show error message when account is locked', function () {
                authentication.setError = true;
                authentication.errorReason = 'ACCOUNT_LOCKED';

                runController();
                scope.model = {
                    'username': 'nancyann',
                    'password': 'abcd1234'
                };
                scope.submit();

                expect(scope.model.errorMessage).toMatch(/account has been locked/);
            });

            it('should show server unavailable error message on unknown login error', function () {
                authentication.setError = true;
                authentication.errorStatus = 500;
                authentication.errorReason = 'UNKNOWN';

                runController();
                scope.model = {
                    'username': 'nancyann',
                    'password': 'abcd1234'
                };
                scope.submit();

                expect(scope.model.errorMessage).toMatch(/Error communicating with OpenTele/);
            });

            it('should show error message instead of login form when server is unreachable', function () {
                serverInfo.get = function (success, error) {
                    error();
                };

                runController();

                expect(scope.model.showLoginForm).toBe(false);
                expect(scope.model.errorMessage).toMatch(/not connect to server/);
            });

            it('should show logged out error message when redirected to from other location', function () {
                appContext.requestParams.set('authenticationError', 'LOGGED_OUT');

                runController();

                expect(scope.model.errorMessage).toMatch(/logged out/);
            });

            it('should log current user out when navigating to login page', function () {
                appContext.currentUser.set({
                    firstName: 'foo',
                    lastName: 'bar'
                });

                runController();

                expect(authentication.logoutCalled).toBe(true);
                expect(appContext.currentUser.get()).toEqual({});
            });
        });
    });
}());
