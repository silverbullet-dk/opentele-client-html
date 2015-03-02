(function () {
    'use strict';

    var testHttpModule = angular.module('testHttp', ['ng']);
    testHttpModule.service('testHttpService', function ($http, $location) {
        return {
            performNormalHttpRequest: function () {
                $location.path("/someurl");
                return $http.get('/someurl');

            },
            performPostHttpRequest: function () {
                return $http.post('/someurl');
            },
            performRequestNoResponseInterception: function () {
                $location.path("/someotherurl");
                var config = {
                    errorPassThrough: true
                };
                return $http.get('/someotherurl', config);
            }
        };
    });

    describe('opentele.restApiServices.interceptors', function () {
        var httpProvider, httpBackend, testHttpService, httpNotifications;

        beforeEach(function () {
            module('opentele.restApiServices.interceptors', function ($httpProvider, httpNotificationsProvider) {
                httpProvider = $httpProvider;
                httpNotifications = httpNotificationsProvider;
            });

            module('testHttp');
            module('opentele.stateServices');
        });

        beforeEach(inject(function ($httpBackend, _testHttpService_) {
            httpBackend = $httpBackend;
            testHttpService = _testHttpService_;
        }));

        it('should have registered all interceptors', function () {
            expect(httpProvider.interceptors.length).toBe(2);
        });

        describe('http notifications interceptor', function() {
            it('should raise request started and ended event on success', function () {
                spyOn(httpNotifications, 'fireRequestStarted');
                spyOn(httpNotifications, 'fireRequestEnded');
                httpBackend.whenGET('/someurl').respond({});

                testHttpService.performNormalHttpRequest().success(function () {});

                httpBackend.flush();
                expect(httpNotifications.fireRequestStarted).toHaveBeenCalled();
                expect(httpNotifications.fireRequestEnded).toHaveBeenCalled();
            });

            it('should raise request started and ended event on error', function () {
                spyOn(httpNotifications, 'fireRequestStarted');
                spyOn(httpNotifications, 'fireRequestEnded');
                httpBackend.whenGET('/someurl').respond(500);

                testHttpService.performNormalHttpRequest().error(function () {});

                httpBackend.flush();
                expect(httpNotifications.fireRequestStarted).toHaveBeenCalled();
                expect(httpNotifications.fireRequestEnded).toHaveBeenCalled();
            });

            it('should raise request started and ended event on POST requests', function () {
                spyOn(httpNotifications, 'fireRequestStarted');
                spyOn(httpNotifications, 'fireRequestEnded');
                httpBackend.whenPOST('/someurl').respond(200, {});

                testHttpService.performPostHttpRequest().success(function () {});

                httpBackend.flush();
                expect(httpNotifications.fireRequestStarted).toHaveBeenCalled();
                expect(httpNotifications.fireRequestEnded).toHaveBeenCalled();
            });
        });

        describe('http status interceptor', function() {
            var location, appContext;

            beforeEach(inject(function ($location, _appContext_) {
                location = $location;
                appContext = _appContext_;
            }));

            it('should do nothing when response is success response', function () {
                httpBackend.whenGET('/someurl').respond({});
                var successCallbackInvoked = false;

                testHttpService.performNormalHttpRequest().success(function () {
                    successCallbackInvoked = true;
                });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(true);
            });

            it('should redirect to login page with error description on 401 errors', function () {
                httpBackend.whenGET('/someurl').respond(401);

                testHttpService.performNormalHttpRequest();

                httpBackend.flush();
                expect(location.path()).toEqual('/login');
                expect(appContext.requestParams.getAndClear('authenticationError')).toBe('LOGGED_OUT');
            });

            it('should redirect to error page on non-401 errors', function () {
                httpBackend.whenGET('/someurl').respond(500);

                testHttpService.performNormalHttpRequest();

                httpBackend.flush();
                expect(location.path()).toEqual('/error');
            });

            it('should skip response interception when requested', function () {
                httpBackend.whenGET('/someotherurl').respond(401);

                var successCallbackInvoked = false;
                var errorCallbackInvoked = false;

                testHttpService.performRequestNoResponseInterception()
                    .success(function () {
                        successCallbackInvoked = true;
                    })
                    .error(function () {
                        errorCallbackInvoked = true;
                    });

                httpBackend.flush();
                expect(successCallbackInvoked).toBe(false);
                expect(errorCallbackInvoked).toBe(true);
            });
        });
    });
}());
