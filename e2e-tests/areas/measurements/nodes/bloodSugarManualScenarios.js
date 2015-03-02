(function() {
    'use strict';

    describe('fill out questionnaire with manual input of blood sugar value', function() {
        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var bloodSugarPage = require('./bloodSugarManualPage.js');
        var sendReplyPage = require('../SendReplyPage.js');

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(0);
        });

        it('should show questionnaire', function() {
            questionnairePage.assertCorrectHeading('måles blodsukker');
        });

        it('should navigate to end node when omitting input', function() {
            questionnairePage.toFirstQuestion();
            questionnairePage.clickOmit();

            sendReplyPage.assertSendReplyPage();
        });

        it('should have input be required', function() {
            questionnairePage.toFirstQuestion();

            bloodSugarPage.checkBeforeMeal(); // we don't input the required blood sugar value

            questionnairePage.assertNextButtonDisabled();
        });

        it('should be able to fill out questionnaire and send reply', function() {
            questionnairePage.toFirstQuestion();
            bloodSugarPage.enterBloodSugarValue(12);
            bloodSugarPage.checkBeforeMeal();
            questionnairePage.clickNext();
            
            questionnairePage.assertCanSendReply();
        });
    });
}());
