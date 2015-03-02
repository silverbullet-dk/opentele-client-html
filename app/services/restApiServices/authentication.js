(function() {
    'use strict';

    var authenticationService = angular.module('opentele.restApiServices.authentication', [
        'base64',
        'opentele.restApiServices'
    ]);

    authenticationService.service('authentication', function($base64, $http, restConfig, appConfig) {

        var request = {

            login: function(patientUrl, username, password, onSuccess, onError) {
                var encoded = encode(username, password);

                var config = {};
                config.headers = {
                    'Authorization': "Basic " + encoded,
                    'Client-version' : appConfig.version
                };
                config.errorPassThrough = true;
                $http.get(patientUrl, config)
                    .success(wrapSuccess(onSuccess, onError, encoded, username, password))
                    .error(wrapError(onError));
            },

            logout: function(onSuccess) {
                delete $http.defaults.headers.common.Authorization;
                onSuccess();
            },

            changePassword: function(user, newPassword, newPasswordRepeat, onSuccess, onError) {
                var handleResponse = function(data, login) {
                    if (data.hasOwnProperty('status') && data.status === 'error') {
                        var messages = data.errors.map(function(err) {
                            return err.error;
                        });
                        var response = {
                            code: 'BAD_PASSWORD',
                            message: messages.join()
                        };
                        onError(422, response);
                        return;
                    }
                    login(user.links.self, user.username, newPassword,
                        function(response) {
                            onSuccess(response);
                        },
                        function(status, error) {
                            onError(status, error);
                        });
                };

                if (!user.hasOwnProperty('links') || !user.links.hasOwnProperty('password')) {
                    throw new TypeError('User object does not contain a link relation to changePassword');
                }

                var body = {
                    currentPassword: user.password,
                    password: newPassword,
                    passwordRepeat: newPasswordRepeat
                };
                var doLogin = this.login;
                $http.post(user.links.password, body)
                    .success(function(data) {
                        handleResponse(data, doLogin);
                    });
            }
        };

        var encode = function(username, password) {
            return $base64.encode(username + ":" + password);
        };

        var setAuthorizationHeader = function(userToken) {
            $http.defaults.headers.common.Authorization = "Basic " + userToken;
        };

        var wrapSuccess = function(onSuccess, onError, userToken, username, password) {
            setAuthorizationHeader(userToken);

            return function(response) {
                var patient = {
                    firstName: response.firstName,
                    lastName: response.lastName,
                    username: username,
                    password: password,
                    passwordExpired : response.passwordExpired,
                    links: response.links
                };
                return onSuccess(patient);
            };
        };

        var wrapError = function(onError) {
            return function(data, status, headers) {
                if (headers('AccountIsLocked') === 'true') {
                    onError(401, {code: 'ACCOUNT_LOCKED'});
                    return;
                }
                if (status === 401) {
                    onError(status, {code: 'BAD_CREDENTIALS'});
                    return;
                }
                onError(status, 'UNKNOWN');
            };
        };

        return request;
    });
}());
