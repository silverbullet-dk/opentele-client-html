(function() {
    'use strict';

    describe('opentele.restApiServices.authentication service', function() {
        var base64, httpBackend, http, restConfig;
        var authentication;
        var user, loginUrl;

        beforeEach(module('opentele.restApiServices.authentication'));

        beforeEach(function() {
            var appConfig = jasmine.createSpy();
            appConfig.version = '1.27.0';
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost";
            restConfig.loginUrl = "/patient";

            loginUrl = restConfig.baseUrl + 'patient';

            module(function($provide) {
                $provide.value('restConfig', restConfig);
                $provide.value('appConfig', appConfig);
            });
        });

        beforeEach(inject(function(_authentication_, $base64, $httpBackend, $http) {
            authentication = _authentication_;
            base64 = $base64;
            httpBackend = $httpBackend;
            http = $http;
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        describe('login tests', function() {

            it('should invoke error callback when status is 401', function() {
                httpBackend.whenGET(loginUrl).respond(401);
                var errorCallbackInvoked = false;
                var successCallbackInvoked = false;

                authentication.login(loginUrl, "user", "password",
                    function() {
                        successCallbackInvoked = true;
                    },
                    function(statusCode, reason) {
                        errorCallbackInvoked = true;
                        expect(statusCode).toEqual(401);
                        expect(reason).toEqual({code: 'BAD_CREDENTIALS'});
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(false);
                expect(errorCallbackInvoked).toEqual(true);
            });

            it('should invoke error callback with proper reason when account is locked', function() {
                httpBackend.whenGET(loginUrl).respond(401, {}, {
                    'AccountIsLocked': 'true'
                });
                var errorCallbackInvoked = false;
                var successCallbackInvoked = false;

                authentication.login(loginUrl, "user", "password",
                    function() {
                        successCallbackInvoked = true;
                    },
                    function(statusCode, reason) {
                        errorCallbackInvoked = true;
                        expect(reason).toEqual({code: 'ACCOUNT_LOCKED'});
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(false);
                expect(errorCallbackInvoked).toEqual(true);
            });

            it('should invoke error callback on non-401 errors', function() {
                httpBackend.whenGET(loginUrl).respond(500);
                var errorCallbackInvoked = false;
                var successCallbackInvoked = false;

                authentication.login(loginUrl, "user", "password",
                    function() {
                        successCallbackInvoked = true;
                    },
                    function(statusCode, reason) {
                        errorCallbackInvoked = true;
                        expect(statusCode).toEqual(500);
                        expect(reason).toEqual('UNKNOWN');
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toEqual(false);
                expect(errorCallbackInvoked).toEqual(true);
            });

            it('should invoke success callback when response is valid', function() {
                httpBackend.whenGET(loginUrl).respond({});
                var errorCallbackInvoked = false;
                var successCallbackInvoked = false;

                authentication.login(loginUrl, "user", "password",
                    function() {
                        successCallbackInvoked = true;
                    },
                    function() {
                        errorCallbackInvoked = true;
                    });
                httpBackend.flush();

                expect(errorCallbackInvoked).toEqual(false);
                expect(successCallbackInvoked).toEqual(true);
            });

            it('should transform response to client object', function() {
                httpBackend.whenGET(loginUrl).respond({
                    firstName: "first",
                    lastName: "last",
                    passwordExpired: false,
                    links: {
                        bla: 'some/url'
                    }
                });
                var resultData = {};

                authentication.login(loginUrl, "user", "secret", function(response) {
                    resultData = response;
                }, function() {});
                httpBackend.flush();

                expect(resultData).toEqual({
                    firstName: "first",
                    lastName: "last",
                    username: "user",
                    password: "secret",
                    passwordExpired: false,
                    links: {
                        bla: 'some/url'
                    }
                });
            });
        });

        describe('logout tests', function() {
            it('should be possible to logout', function() {
                httpBackend.whenGET(loginUrl).respond({});
                authentication.login(loginUrl, "user", "pw", function() {});
                httpBackend.flush();
                expect(http.defaults.headers.common.Authorization).toMatch(/Basic/);

                authentication.logout(function() {
                    expect(http.defaults.headers.common.Authorization).not.toBeDefined();
                });
            });

            it('should not throw error if not logged in', function() {
                expect(http.defaults.headers.common.Authorization).not.toBeDefined();

                authentication.logout(function() {
                    expect(http.defaults.headers.common.Authorization).not.toBeDefined();
                });
            });
        });

        describe('change password tests', function() {
            var changePasswordUrl;
            beforeEach(function() {
                changePasswordUrl = 'password/changeme';
                user = {
                    username: 'someuser',
                    password: 'somepw',
                    links: {
                        self: loginUrl,
                        password: changePasswordUrl
                    }
                };
            });

            it('should invoke success callback when password changed', function() {
                httpBackend.whenPOST(changePasswordUrl).respond(200, {});
                httpBackend.whenGET(loginUrl).respond(200, {});

                var successCallbackInvoked = false;
                var errorCallbackInvoked = false;
                authentication.changePassword(user, '123', '123', function() {
                    successCallbackInvoked = true;
                }, function() {
                    errorCallbackInvoked = true;
                });
                httpBackend.flush();

                expect(errorCallbackInvoked).toBe(false);
                expect(successCallbackInvoked).toBe(true);
            });

            it('should format correct request', function() {
                var requestData = {};
                httpBackend.whenPOST(changePasswordUrl, function(data) {
                    requestData = JSON.parse(data);
                    return true;
                }).respond(200, {});
                httpBackend.whenGET(loginUrl).respond(200, {});

                authentication.changePassword(user, '123', '123', function() {});
                httpBackend.flush();

                expect(requestData).toEqual({
                    currentPassword: 'somepw',
                    password: '123',
                    passwordRepeat: '123'
                });
            });

            it('should transform error body to proper error status code', function() {
                httpBackend.whenPOST(changePasswordUrl).respond(200, {
                    status: 'error',
                    errors: [
                        {
                            error: 'first error',
                            field: 'password'
                        },
                        {
                            error: 'second error',
                            field: 'password'
                        }
                    ]
                });
                httpBackend.whenGET(loginUrl).respond(200, {});

                var actualErrors = [];
                var actualStatus = 0;
                authentication.changePassword(user, '123', '123', function() {}, function(status, error) {
                    actualStatus = status;
                    actualErrors = error.message.split(',');
                });
                httpBackend.flush();

                expect(actualStatus).toBe(422);
                expect(actualErrors.length).toBe(2);
                expect(actualErrors).toContain('first error');
                expect(actualErrors).toContain('second error');
            });

            it('should set authorization header on success', function () {
                httpBackend.whenPOST(changePasswordUrl).respond(200, {status: 'ok'});
                httpBackend.whenGET(loginUrl).respond(200, {});

                var headerToken = '';
                authentication.changePassword(user, '123', '123', function() {
                    headerToken = http.defaults.headers.common.Authorization;
                });
                httpBackend.flush();

                expect(headerToken).toEqual('Basic c29tZXVzZXI6MTIz');
            });

            it('should re-fetch patient on success by re-submitting login', function () {
                httpBackend.whenPOST(changePasswordUrl).respond(200, {status: 'ok'});
                httpBackend.whenGET(loginUrl).respond(200, {firstName: 'lars'});

                var updatedPatient = {};
                authentication.changePassword(user, '123', '123', function(response) {
                    updatedPatient = response;
                });
                httpBackend.flush();

                expect(updatedPatient.firstName).toEqual('lars');
            });

            it('should invoke error callback with login error if re-submitting login fails', function () {
                httpBackend.whenPOST(changePasswordUrl).respond(200, {status: 'ok'});
                httpBackend.whenGET(loginUrl).respond(401);

                var error = {};
                var statusCode = 0;
                authentication.changePassword(user, '123', '123', function() {}, function(status, response) {
                    statusCode = status;
                    error = response;
                });
                httpBackend.flush();

                expect(error.code).toEqual('BAD_CREDENTIALS');
                expect(statusCode).toEqual(401);
            });
        });
    });
}());
