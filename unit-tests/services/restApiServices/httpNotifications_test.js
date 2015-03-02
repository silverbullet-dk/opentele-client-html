(function() {
    'use strict';

    describe('opentele.restApiServices.httpNotifications service', function() {
        var httpNotifications;

        beforeEach(module('opentele.restApiServices.httpNotifications'));

        beforeEach(inject(function(_httpNotifications_) {
            httpNotifications = _httpNotifications_;
        }));

        it('should be possible to be notified about http request start', function() {
            var notificationData = {};
            httpNotifications.subscribeOnRequestStarted(function(request) {
                notificationData = request;
            });

            httpNotifications.fireRequestStarted({
                data: true
            });

            expect(notificationData).toEqual({
                data: true
            });
        });

        it('should be possible to be notified about http request end', function() {
            var notificationData = {};
            httpNotifications.subscribeOnRequestEnded(function(request) {
                notificationData = request;
            });

            httpNotifications.fireRequestEnded({
                data: true
            });

            expect(notificationData).toEqual({
                data: true
            });
        });

        it('should be able to get count of outstanding requests', function() {
            httpNotifications.fireRequestStarted();
            httpNotifications.fireRequestStarted();
            httpNotifications.fireRequestStarted();
            expect(httpNotifications.getRequestCount()).toBe(3);

            httpNotifications.fireRequestEnded();
            httpNotifications.fireRequestEnded();
            expect(httpNotifications.getRequestCount()).toBe(1);

            httpNotifications.fireRequestEnded();
            expect(httpNotifications.getRequestCount()).toBe(0);
        });
    });
}());
