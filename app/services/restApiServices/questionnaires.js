(function () {
    'use strict';

    var questionnairesService = angular.module('opentele.restApiServices.questionnaires', ['ngResource']);

    questionnairesService.service('questionnaires', function ($http, restConfig) {
        return {
            listFor: function (user, onSuccess) {
                var wrapSuccess = function (onSuccess) {
                    return function (responseData) {
                        var questionnaires = responseData.questionnaires.map(function (elem) {
                            var detailLink = restConfig.baseUrl + 'rest/questionnaire/download/' + elem.id;
                            return {
                                name: elem.name,
                                version: elem.version,
                                id: elem.id,
                                links: {questionnaire: detailLink}
                            };
                        });
                        onSuccess({
                            questionnaires: questionnaires
                        });
                    };
                };

                if (!user.hasOwnProperty('links') || !user.links.hasOwnProperty('questionnaires')) {
                    throw new TypeError('User object does not contain a link relation to questionnaires');
                }

                $http.get(user.links.questionnaires)
                    .success(wrapSuccess(onSuccess));
            },

            get: function (questionnaireRef, onSuccess) {
                var wrapSuccess = function (onSuccess) {
                    return function (responseData) {
                        if (responseData === null) {
                            onSuccess({});
                            return;
                        }
                        var resultLink = restConfig.baseUrl + 'rest/questionnaire/listing';
                        responseData.links = {questionnaireResult: resultLink};
                        responseData.version = questionnaireRef.version;
                        onSuccess(responseData);
                    };
                };

                if (!questionnaireRef.hasOwnProperty('links') || !questionnaireRef.links.hasOwnProperty('questionnaire')) {
                    throw new TypeError('Questionnaire ref does not contain a link relation to questionnaire details');
                }

                $http.get(questionnaireRef.links.questionnaire)
                    .success(wrapSuccess(onSuccess));
            },

            replyTo: function(questionnaire, outputs, onSuccess, onError) {
                var wrapSuccess = function (onSuccess) {
                    return function () {
                        onSuccess();
                    };
                };

                if (!questionnaire.hasOwnProperty('links') || !questionnaire.links.hasOwnProperty('questionnaireResult')) {
                    throw new TypeError('User object does not contain a link relation to questionnaireResult');
                }

                var data = {
                    name: questionnaire.name,
                    QuestionnaireId: questionnaire.id,
                    version: questionnaire.version,
                    output: outputs,
                    date: new Date().toISOString()
                };
                console.log('POST questionnaire data: ' + JSON.stringify(data));
                var config = {errorPassThrough: true};
                $http.post(questionnaire.links.questionnaireResult, data, config)
                    .success(wrapSuccess(onSuccess))
                    .error(onError);
            }
        };
    });
}());
