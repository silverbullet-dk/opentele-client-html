(function() {
    'use strict';

    var notification = angular.module('opentele.restApiServices.httpNotifications', []);

    notification.provider('httpNotifications', function() {
        var onRequestStartedListeners = [];
        var onRequestEndedListeners = [];

        var count = 0;
        var requestCounter = {
            increment: function() {
                count++;
            },
            decrement: function() {
                if (count > 0) count--;
            },
            getCount: function() {
                return count;
            }
        };

        this.subscribeOnRequestStarted = function(listener) {
            onRequestStartedListeners.push(listener);
        };

        this.fireRequestStarted = function(request) {
            requestCounter.increment();
            angular.forEach(onRequestStartedListeners, function(listener) {
                listener(request);
            });
            return request;
        };

        this.subscribeOnRequestEnded = function(listener) {
            onRequestEndedListeners.push(listener);
        };


        this.fireRequestEnded = function() {
            requestCounter.decrement();
            var passedArgs = arguments;
            angular.forEach(onRequestEndedListeners, function(listener) {
                listener.apply(this, passedArgs);
            });
            return arguments[0];
        };

        this.getRequestCount = requestCounter.getCount;

        this.$get = function() {
            var that = this;
            return {
                subscribeOnRequestStarted: that.subscribeOnRequestStarted,
                subscribeOnRequestEnded: that.subscribeOnRequestEnded,
                fireRequestEnded: that.fireRequestEnded,
                fireRequestStarted: that.fireRequestStarted,
                getRequestCount: that.getRequestCount
            };
        };
    });
}());
