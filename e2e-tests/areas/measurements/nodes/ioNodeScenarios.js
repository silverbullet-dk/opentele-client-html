(function() {
    'use strict';

    describe('fill out saturation questionnaire based on generic input nodes', function() {
        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var ioNodePage = require('./ioNodePage.js');
        var sendReplyPage = require('../SendReplyPage.js');

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(1);
        });

        it('should show questionnaire for saturation', function() {

			ioNodePage.headings.then(function(items)
			{
				expect(items.length).toBe(1);
				expect(items[0].getText()).toMatch(/måles Saturation/);
			});
        });

        it('should navigate to end node when omitting input', function() {
            questionnairePage.toFirstQuestion();
            questionnairePage.clickOmit();
            expect(sendReplyPage.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
        });

        it('should require input fields to be filled', function() {
            questionnairePage.toFirstQuestion();

            ioNodePage.enterSaturationValue(123); // only fill one field

            expect(questionnairePage.rightButton.isEnabled()).toBe(false);
        });

        it('should be able to fill out questionnaire and send reply', function() {
            questionnairePage.toFirstQuestion();

            ioNodePage.enterSaturationValue(123);
            ioNodePage.enterPulseValue(61.23);
            ioNodePage.enterHealthText('I am fine!');
            questionnairePage.clickNext();

            expect(sendReplyPage.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
            sendReplyPage.clickSendReply();

            browser.sleep(1000); // wait to skip progress page
            expect(sendReplyPage.endPageConfirmReplySent.getText()).toMatch(
                /Measurements.*replies.*received/);
        });
    });

    describe('fill out radioknap test questionnaire based on generic input nodes', function() {

        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var ioNodePage = require('./ioNodePage.js');
        var sendReplyPage = require('../SendReplyPage.js');

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(20); // radioknap test
        });

        it('should show questionnaire for radioknap test', function() {

            ioNodePage.headings.then(function(items)
            {
                expect(items.length).toBe(1);
                expect(items[0].getText()).toMatch(/Radioknap/);
            });
        });

        it('should require a radio button to be selected', function() {
            questionnairePage.clickCenterButton();
            expect(questionnairePage.centerButton.isEnabled()).toBe(false);
        });

        it('should be able to fill out questionnaire and send reply', function() {
            questionnairePage.clickCenterButton();
            ioNodePage.selectRadioButton(0);
            expect(questionnairePage.centerButton.isEnabled()).toBe(true);
            questionnairePage.clickCenterButton();
            expect(sendReplyPage.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
            sendReplyPage.clickSendReply();

            browser.sleep(1000); // wait to skip progress page
            expect(sendReplyPage.endPageConfirmReplySent.getText()).toMatch(
                /Measurements.*replies.*received/);
        });
    });

}());
