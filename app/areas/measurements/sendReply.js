(function() {
	'use strict';

	var sendReply = angular.module('opentele.controllers.sendReply', [
		'ngRoute',
		'opentele.stateServices',
		'opentele.restApiServices',
		'opentele.translations'
	]);

	sendReply.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/send_reply', {
				title: 'SEND_REPLIES_TITLE',
				templateUrl: 'areas/measurements/sendReply.html'
			});
	}]);

	sendReply.controller('SendReplyCtrl', function($scope, $window, $location, $translate, appContext, headerService, questionnaires) {
		if (!appContext.requestParams.containsKey('questionnaireState')) {
			$location.path('/menu');
			return;
		}

		$scope.model = {};
		var setViewState = function(show) {
			$scope.model.showConfirm = false;
			$scope.model.showUploading = false;
			$scope.model.showAcknowledge = false;
			$scope.model.showFailed = false;
			$scope.model[show] = true;
		};

		var setTitle = function(title) {
			$scope.sharedModel.title = title;
		};

		$scope.model.skipSendClick = function() {
			$location.path('/menu');
		};

		$scope.model.sendClick = function() {
			headerService.setHeader(false);
			setTitle($translate.instant("UPLOADING_REPLIES_TEXT"));
			setViewState('showUploading');
			questionnaires.replyTo(state.questionnaire, state.outputs,
				function() {
					setTitle($translate.instant("SEND_REPLIES_TITLE"));
					setViewState('showAcknowledge');
				},
				function() {
					setTitle($translate.instant("ERROR_TITLE"));
					setViewState('showFailed');
				});
		};

		$scope.model.ackOkClick = function() {
			$location.path('/menu');
		};

		$scope.model.cancelRetryClick = function() {
			$location.path('/menu');
		};

		$scope.$on('backClick', function() {
			appContext.requestParams.set('selectedQuestionnaire', state.questionnaireRef);
			appContext.requestParams.set('nodeHistory', state.nodeHistory);
            $window.history.back();
		});

		var state = appContext.requestParams.getAndClear('questionnaireState');
		setViewState('showConfirm');
	});
}());
