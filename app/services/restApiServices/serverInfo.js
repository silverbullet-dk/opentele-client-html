(function () {
    'use strict';

    var serverInfoService = angular.module('opentele.restApiServices.serverInfo', []);

    serverInfoService.service('serverInfo', function($http, restConfig) {
        var info = {
            get: function(onSuccess, onError) {
                var config = {
                    errorPassThrough: true
                };

                $http.get(restConfig.baseUrl, config)
                    .success(function(data) {
                        onSuccess(data);
                    })
                    .error(onError);
            }
        };

        return info;
    });
}());
