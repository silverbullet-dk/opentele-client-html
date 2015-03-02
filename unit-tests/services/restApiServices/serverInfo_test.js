(function () {
    'use strict';

    describe('serverInfo service tests', function () {
        var httpBackend, restConfig, serverInfo;

        beforeEach(module('opentele.restApiServices.serverInfo'));

        beforeEach(function () {
            restConfig = jasmine.createSpy();
            restConfig.baseUrl = "http://localhost";

            module(function ($provide) {
                $provide.value('restConfig', restConfig);
            });
        });

        beforeEach(inject(function ($httpBackend, _serverInfo_) {
            httpBackend = $httpBackend;
            serverInfo = _serverInfo_;
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should get server info', function () {
            var info = {
                version: "BUILD-208_2014-09-23_00-18-50",
                minimumRequiredClientVersion: "1.23.0",
                serverEnvironment: "development"
            };
            httpBackend.whenGET('http://localhost').respond(info);

            var actualData = {};
            serverInfo.get(function(data) {
                actualData = data;
            });

            httpBackend.flush();
            expect(actualData).toEqual(info);
        });

        it('should propagate errors back to caller', function() {
            httpBackend.whenGET('http://localhost').respond(0); // server down

            var statusCode;
            var successCalled = false;
            serverInfo.get(function() {successCalled = true;}, function(data, status) {statusCode = status;});

            httpBackend.flush();

            expect(successCalled).toBe(false);
            expect(statusCode).toBe(0);
        });
    });
}());