(function() {
    'use strict';

    describe('fill out questionnaire with manual input of crp value', function() {
        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var crpNodePage = require('./crpNodePage.js');
        var sendReplyPage = require('../SendReplyPage.js');

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(11); // C-reaktivt Protein (CRP)
        });

        it('should show questionnaire', function() {
            questionnairePage.assertCorrectHeading('Indtast værdi eller vælg <5');
        });

        it('should navigate to end node when omitting input', function() {
            questionnairePage.clickOmit();
            sendReplyPage.assertSendReplyPage();
        });

        it('should have input be required', function() {
            questionnairePage.assertNextButtonDisabled();
        });

        it('should be able to check <5 and send reply', function() {
            crpNodePage.checkLt5();
            questionnairePage.clickNext();
            questionnairePage.assertCanSendReply();
        });

        it('should not be able to insert invalid value and send reply', function() {
            crpNodePage.enterCrpValue(-42);
            questionnairePage.assertNextButtonDisabled();
        });

        it('should be able to insert valid value and send reply', function() {
            crpNodePage.enterCrpValue(1.3);
            questionnairePage.clickNext();
            questionnairePage.assertCanSendReply();
        });

        it('should not be able to insert value while also checking <5', function() {
            crpNodePage.checkLt5();
            crpNodePage.enterCrpValue(1.3);
            questionnairePage.assertNextButtonDisabled();
        });

        it('should be able to insert valid value <5 and send reply', function() {
            crpNodePage.enterCrpValue(3);
            questionnairePage.clickNext();
            questionnairePage.assertCanSendReply();
        });

    });
}());
