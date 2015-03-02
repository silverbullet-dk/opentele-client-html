(function() {
    'use strict';

    var statePassingServices = angular.module('opentele.stateServices.statePassingServices', []);

    statePassingServices.service('appContext', function() {
        var user = {};
        var currentUser = {
            set: function(data) {
                user = data;
            },
            get: function() {
                return user;
            },
            clear: function() {
                user = {};
            },
            isValid: function() {
                return 'firstName' in user && 'lastName' in user;
            }
        };

        var params = {};
        var requestParams = {
            set: function(key, value) {
                params[key] = value;
            },
            get: function(key) {
                return params[key];
            },
            getAndClear: function(key) {
                if (!params.hasOwnProperty(key)) {
                    throw new Error('Key does not exist');
                }

                var value = params[key];
                delete params[key];
                return value;
            },
            containsKey: function(key) {
                return params.hasOwnProperty(key);
            }
        };

        return {
            currentUser: currentUser,
            requestParams: requestParams
        };
    });

}());
