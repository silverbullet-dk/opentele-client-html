(function() {
    'use strict';

    var nativeServices = angular.module('opentele.stateServices.nativeServices', []);

    nativeServices.service('nativeService', function($window) {

        var exists = function(identifier) {
            return (identifier !== undefined && identifier !== null);
        };

        var getDeviceInformation = function() {
            var native = $window.Native;
            if (exists(native) && exists(native.getDeviceInformation)) {
                return JSON.parse(native.getDeviceInformation());
            }
            return {};
        };

        var sendReminders = function(reminderList) {
            var native = $window.Native;
            if (exists(native) && exists(native.sendReminders)) {
                native.sendReminders(JSON.stringify(reminderList));
            }
        };

        var clearRemindersForQuestionnaire = function(questionnaireName) {
            var native = $window.Native;
            if (exists(native) && exists(native.clearRemindersForQuestionnaire)) {
                native.clearRemindersForQuestionnaire(questionnaireName);
            }
        };

        var getQuestionnairesToHighlight = function() {
            var native = $window.Native;
            if (exists(native) && exists(native.getQuestionnairesToHighlight)) {
                var questionnairesToHighlight = native.getQuestionnairesToHighlight();
                return JSON.parse(questionnairesToHighlight);
            }
            return [];
        };

        return {
            getDeviceInformation: getDeviceInformation,
            sendReminders: sendReminders,
            clearRemindersForQuestionnaire: clearRemindersForQuestionnaire,
            getQuestionnairesToHighlight: getQuestionnairesToHighlight
        };

    });

}());
