(function() {
	'use strict';

	describe('fill out questionnaire with manual input of glucose level in the urine', function() {
		var loginPage = require('../../login/loginPage.js');
		var menuPage = require('../../menu/menuPage.js');
		var measurementsPage = require('../performMeasurementsPage.js');
		var questionnairePage = require('../questionnairePage.js');
		var sendReplyPage = require('../SendReplyPage.js');
		var urinePage = require('./urineProteinGlucosePage.js');

		beforeEach(function() {
			loginPage.get();
			loginPage.doLogin('nancyann', 'abcd1234');
			menuPage.toMeasurements();
			measurementsPage.toQuestionnaire(6);
		});

		it('should show questionnaire', function() {
			questionnairePage.assertCorrectHeading('Indtast resultatet fra din urinundersøgelse');
		});

		it('should navigate to end node when omitting input', function() {
			questionnairePage.clickOmit();

			sendReplyPage.assertSendReplyPage();
		});

		it('should have input be required', function() {
			questionnairePage.assertNextButtonDisabled();
		});

		it('should be able to fill out questionnaire and send reply', function() {
			urinePage.checkPlusOne();
			questionnairePage.clickNext();

			questionnairePage.assertCanSendReply();
		});
	});
}());
