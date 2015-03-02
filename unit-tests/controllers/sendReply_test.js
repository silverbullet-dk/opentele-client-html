(function() {
	'use strict';

	describe('opentele.controllers.sendReply module', function() {

		beforeEach(module('opentele.controllers.sendReply'));

		describe('SendReplyCtrl', function() {
			var scope, location, appContext, questionnairesRestClient, runController, currentQuestionnaire;

			beforeEach(module(function($provide) {
				currentQuestionnaire = {
					"name": "Blodsukker (manuel)",
					"id": 27,
					"startNode": "157",
					"endNode": "159",
					"nodes": [
						{
							"IONode": {
								"nodeName": "157",
								"elements": [
									{
										"TextViewElement": {
											"text": "Time to measure blood sugar!"
										}
								},
									{
										"ButtonElement": {
											"text": "Næste",
											"gravity": "center",
											"next": "158"
										}
								}
							]
							}
						},
						{
							"BloodSugarManualDeviceNode": {
								"nodeName": "158",
								"next": "ANSEV_159_D158",
								"nextFail": "AN_158_CANCEL",
								"text": "Blodsukker",
								"bloodSugarMeasurements": {
									"name": "158.BS#BLOODSUGARMEASUREMENTS",
									"type": "Integer"
								},
								"deviceId": {
									"name": "158.BS#DEVICE_ID",
									"type": "String"
								}
							}
						},
						{
							"EndNode": {
								"nodeName": "159"
							}
						}
					],
					"output": []
				};

				questionnairesRestClient = {};
				$provide.value('questionnaires', questionnairesRestClient);
			}));

			module('opentele.stateServices');

			beforeEach(inject(function($rootScope, $controller, $location,
				$translate, _appContext_, _headerService_, _questionnaires_) {
				appContext = _appContext_;
				scope = $rootScope.$new();
				$rootScope.sharedModel = {};
				location = $location;

				appContext.requestParams.set('questionnaireState', {
					outputs: [{
						name: 'test name',
						value: 1234
					}],
					questionnaire: currentQuestionnaire,
					questionnaireRef: {id: 1},
					nodeHistory: ['123', '456']
				});

				runController = function() {
					$controller('SendReplyCtrl', {
						'$scope': scope,
						'$location': location,
						'$translate': $translate,
						'appContext': _appContext_,
						'headerService': _headerService_,
						'questionnaires': _questionnaires_
					});
				};
			}));

			describe('preconditions', function() {
				it('should redirect back to menu page if no questionnaire state has been set', function() {
					appContext.requestParams.getAndClear('questionnaireState'); // clear it...

					runController();

					expect(location.path()).toBe('/menu');
				});
			});

			describe('Back button', function() {
				beforeEach(function() {
					runController();
				});

				it('should navigate back to questionnaire page when back button clicked', function () {
                    window.history.back = function() {
                        location.path('/questionnaire');
                    };

					scope.$parent.$broadcast('backClick');
					expect(location.path()).toBe('/questionnaire');
				});

				it('should transfer state back to questionnaire page when back button clicked', function () {
					scope.$parent.$broadcast('backClick');

					expect(appContext.requestParams.getAndClear('selectedQuestionnaire')).toEqual({id: 1});
					expect(appContext.requestParams.getAndClear('nodeHistory')).toEqual(['123', '456']);
				});
			});

			describe('collect and send output', function() {
				var startSendingReply;

				beforeEach(function() {
					runController();
				});

				it('should start by showing send reply confirmation page', function () {
					expect(scope.model.showConfirm).toBeTruthy();
					expect(scope.model.showUploading).toBeFalsy();
					expect(scope.model.showAcknowledge).toBeFalsy();
					expect(scope.model.showFailed).toBeFalsy();
				});

				it('should show progress page while uploading reply', function() {
					questionnairesRestClient.replyTo = function() {};

					scope.model.sendClick();

					expect(scope.model.showUploading).toBeTruthy();
					expect(scope.model.showAcknowledge).toBeFalsy();
					expect(scope.model.showFailed).toBeFalsy();
					expect(scope.model.showConfirm).toBeFalsy();
					expect(scope.sharedModel.title).toMatch(/Uploading/);
				});

				it('should show acknowledge page and allow user to navigate to menu', function() {
					questionnairesRestClient.replyTo = function(questionnaires, outputs, onSuccess) {
						onSuccess();
					};

					scope.model.sendClick();

					expect(scope.model.showAcknowledge).toBeTruthy();
					expect(scope.model.showUploading).toBeFalsy();
					expect(scope.model.showFailed).toBeFalsy();
					expect(scope.model.showConfirm).toBeFalsy();

					expect(scope.sharedModel.title).toMatch(/Send measurements/);
					scope.model.ackOkClick();
					expect(location.path()).toMatch(/menu/);
				});

				it('should show retry and cancel buttons when upload fails', function() {
					questionnairesRestClient.replyTo = function(questionnaires, outputs, onSuccess, onError) {
						onError();
					};

					scope.model.sendClick();

					expect(scope.model.showFailed).toBeTruthy();
					expect(scope.model.showAcknowledge).toBeFalsy();
					expect(scope.model.showUploading).toBeFalsy();
					expect(scope.model.showConfirm).toBeFalsy();
				});

				it('should show acknowledge page if retry succeeds', function() {
					questionnairesRestClient.shouldFail = true;
					questionnairesRestClient.replyTo = function(questionnaires, outputs, onSuccess, onError) {
						if (this.shouldFail === true) {
							onError();
						} else {
							onSuccess();
						}
					};

					scope.model.sendClick();

					expect(scope.model.showFailed).toBeTruthy();
					questionnairesRestClient.shouldFail = false;
					scope.model.sendClick();

					expect(scope.model.showAcknowledge).toBeTruthy();
					expect(scope.model.showUploading).toBeFalsy();
					expect(scope.model.showFailed).toBeFalsy();
					expect(scope.model.showConfirm).toBeFalsy();
					expect(scope.sharedModel.title).toMatch(/Send measurements/);
				});

				it('should redirect to menu if cancelling retry', function() {
					questionnairesRestClient.replyTo = function(questionnaires, outputs, onSuccess, onError) {
						onError();
					};

					scope.model.sendClick();

					expect(scope.model.showFailed).toBeTruthy();
					scope.model.cancelRetryClick();

					expect(location.path()).toBe('/menu');
				});
			});
		});
	});
})();
