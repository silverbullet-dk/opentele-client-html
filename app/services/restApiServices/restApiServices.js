(function() {
    'use strict';

    var restApiServices = angular.module('opentele.restApiServices', [
        'opentele.restApiServices.acknowledgements',
        'opentele.restApiServices.authentication',
        'opentele.restApiServices.httpNotifications',
        'opentele.restApiServices.interceptors',
        'opentele.restApiServices.logReporting',
        'opentele.restApiServices.messageThreads',
        'opentele.restApiServices.measurements',
        'opentele.restApiServices.questionnaires',
        'opentele.restApiServices.reminders',
        'opentele.restApiServices.serverInfo'
    ]);

}());
