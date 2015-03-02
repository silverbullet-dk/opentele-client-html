(function() {
    'use strict';

    describe('fill out questionnaire containing decision nodes', function() {
        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var sendReplyPage = require('../SendReplyPage.js');
		var decisionNodePage = require('./decisionNodePage.js');

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(3);
        });

        it('should show questionnaire', function() {
            questionnairePage.assertCorrectHeading('Indtast blodtryk og puls');
        });

        it('should be able to fill out questionnaire with simplest decision path', function() {
            decisionNodePage.enterSystolicValue(120);
            decisionNodePage.enterDiastolicValue(90);
            decisionNodePage.enterPulseValue(70);
			questionnairePage.clickNext();

            questionnairePage.assertCanSendReply();
        });

		it('should be able to fill out questionnaire and take different path based on input', function () {
			decisionNodePage.enterSystolicValue(120);
			decisionNodePage.enterDiastolicValue(91); // above 90 will trigger different path...
			decisionNodePage.enterPulseValue(70);
			questionnairePage.clickNext();

			questionnairePage.assertCorrectHeading('Er blodtrykket højere end vanligt?');
			decisionNodePage.clickNo();

			questionnairePage.assertCanSendReply();
		});

		it('should be able to fill out questionnaire and evaluate second decisions based on input', function () {
			decisionNodePage.enterSystolicValue(120);
			decisionNodePage.enterDiastolicValue(111); // above 110 will trigger third path...
			decisionNodePage.enterPulseValue(70);
			questionnairePage.clickNext();

			questionnairePage.assertCorrectHeading('Ring til jordemoder');
			questionnairePage.clickCenterButton();

			questionnairePage.assertCanSendReply();
		});

    });
}());
