(function() {
    'use strict';

    describe('opentele.restApiServices.reminders service', function () {

        var httpProvider, httpBackend, restConfig, nativeService, reminders,
            successCallbackInvoked;

        beforeEach(module('opentele.restApiServices.reminders'));

        beforeEach(module(function($provide) {

            // restConfig
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost/";
            restConfig.loginUrl = "patient/login";
            $provide.value('restConfig', restConfig);

            // nativeService
            nativeService = {
                sendReminders: function() {
                    successCallbackInvoked = true;
                }
            };
            $provide.value('nativeService', nativeService);

        }));

        beforeEach(inject(function($http, $httpBackend) {
            httpProvider = $http;
            httpBackend = $httpBackend;
            successCallbackInvoked = false;
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function(_reminders_) {
            reminders = _reminders_;
        }));

        it('should not invoke callback when status is 401', function() {
            var successCallbackInvoked = false;
            var user = {
                links: {
                    reminders: "http://localhost/rest/reminder/next"
                }
            };
            httpBackend.whenGET(user.links.reminders).respond(401);

            reminders.update(user);
            httpBackend.flush();
            expect(successCallbackInvoked).toBe(false);
        });

        it('should throw exception when user has no link to reminders', function() {
            expect(function() {
                reminders.update({});
            }).toThrow();
            expect(function() {
                reminders.update({
                    links: {}
                });
            }).toThrow();
        });

        it('should invoke success callback when response is valid', function() {
            var user = {
                links: {
                    reminders: "http://localhost/rest/reminder/next"
                }
            };
            httpBackend.whenGET(user.links.reminders).respond({
                reminders: []
            });

            reminders.update(user);
            httpBackend.flush();

            expect(successCallbackInvoked).toEqual(true);
        });

    });
}());