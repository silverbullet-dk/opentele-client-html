(function () {
    'use strict';

    var messageThreadsService = angular.module('opentele.restApiServices.messageThreads', [
        'ngResource'
    ]);

    messageThreadsService.service('messageThreads', function ($http, restConfig) {

        var listFor = function (user, onSuccess) {
            var wrapSuccess = function (onSuccess) {
                return function (responseData) {

                    var threads = responseData.map(function (thread) {
                        var detailLink = restConfig.baseUrl + 'rest/message/list/' + thread.id;
                        var replyToLink = restConfig.baseUrl + 'rest/message/list';
                        var markAsReadLink = restConfig.baseUrl + 'rest/message/markAsRead';
                        return {
                            id: thread.id,
                            name: thread.name,
                            links: {
                                messages: detailLink,
                                replyTo: replyToLink,
                                markAsRead: markAsReadLink
                            }
                        };
                    });

                    onSuccess({
                        threads: threads
                    });
                };
            };

            if (!user.hasOwnProperty('links') || !user.links.hasOwnProperty('messageThreads')) {
                throw new TypeError('User object does not contain a link relation to messages');
            }

            $http.get(user.links.messageThreads)
                .success(wrapSuccess(onSuccess));
        };

        var get = function (threadRef, onSuccess) {
            var wrapSuccess = function (onSuccess) {
                return function (responseData) {
                    if (typeof(responseData) === 'undefined' || responseData === null) {
                        onSuccess({});
                        return;
                    }

                    var messages = responseData.messages.filter(function (message) {
                        return (message.from.id === threadRef.id) || (message.to.id === threadRef.id);
                    });

                    onSuccess({messages: messages});
                };
            };

            if (!threadRef.hasOwnProperty('links') || !threadRef.links.hasOwnProperty('messages')) {
                throw new TypeError('Thread ref does not contain a link relation to messages');
            }

            // until server API has been fixed, we cheat a bit to expose a
            // more restful API to our controllers.
            var url = threadRef.links.messages;
            $http.get(url.substring(0, url.lastIndexOf('/')))
                .success(wrapSuccess(onSuccess));
        };

        var unreadMessages = function (user, onSuccess) {
            var wrapSuccess = function (onSuccess) {
                return function (responseData) {
                    if (typeof(responseData) === 'undefined' || responseData === null) {
                        onSuccess({});
                        return;
                    }

                    onSuccess({unreadMessages: responseData.unread});
                };
            };

            if (!user.hasOwnProperty('links') || !user.links.hasOwnProperty('unreadMessages')) {
                throw new TypeError('User object does not contain a link relation to unread messages');
            }

            $http.get(user.links.unreadMessages)
                .success(wrapSuccess(onSuccess));
        };

        var markAsRead = function(threadRef, messages, onSuccess) {
            var messageIds = messages.map(function(message) {
                return message.id;
            });
            var replyTo = threadRef.links.markAsRead;

            var wrapSuccess = function(onSuccess) {
                return function() {
                    onSuccess();
                };
            };

            var config = {errorPassThrough: true};
            $http.post(replyTo, messageIds, config)
                .success(wrapSuccess(onSuccess));
        };

        var post = function (threadRef, message, onSuccess, onError) {
            var replyTo = threadRef.links.replyTo;
            var config = {errorPassThrough: true};

            var wrapResponse = function(response) {
                return function() {
                    response();
                };
            };

            $http.post(replyTo, message, config).
                success(wrapResponse(onSuccess)).
                error(wrapResponse(onError));
        };

        return {
            listFor: listFor,
            get: get,
            unreadMessages: unreadMessages,
            markAsRead: markAsRead,
            post: post
        };

    });
}());
