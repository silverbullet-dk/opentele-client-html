(function() {
	'use strict';

	describe('fill out questionnaire with manual input of temperature', function() {
		var loginPage = require('../../login/loginPage.js');
		var menuPage = require('../../menu/menuPage.js');
		var measurementsPage = require('../performMeasurementsPage.js');
		var questionnairePage = require('../questionnairePage.js');
		var sendReplyPage = require('../SendReplyPage.js');
		var temperaturePage = require('./simpleInputPage.js');

		beforeEach(function() {
			loginPage.get();
			loginPage.doLogin('nancyann', 'abcd1234');
			menuPage.toMeasurements();
			measurementsPage.toQuestionnaire(4);
		});

		it('should show questionnaire', function() {
			questionnairePage.assertCorrectHeading('Mål din temperatur og indtast resultatet i feltet nedenfor');
		});

		it('should navigate to end node when omitting input', function() {
			questionnairePage.clickOmit();

			sendReplyPage.assertSendReplyPage();
		});

		it('should have input be required', function() {
			questionnairePage.assertNextButtonDisabled();
		});

		it('should be able to fill out questionnaire and send reply', function() {
			temperaturePage.enterValue(38.1);
			questionnairePage.clickNext();

			questionnairePage.assertCanSendReply();
		});
	});
}());
