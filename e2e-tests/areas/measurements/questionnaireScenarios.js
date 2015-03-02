(function() {
    'use strict';

    describe('fill out questionnaires', function() {
        var loginPage = require('../login/loginPage.js');
        var menuPage = require('../menu/menuPage.js');
        var measurementsPage = require('./performMeasurementsPage.js');
        var questionnairePage = require('./questionnairePage.js');
        var bloodSugarPage = require('./nodes/bloodSugarManualPage.js');
        var sendReplyPage = require('./SendReplyPage.js');

        beforeEach(function() {
            loginPage.get();
        });

        describe('error handling when upload fails', function() {
            beforeEach(function() {
                loginPage.doLogin('uploadfails', '1234');
                menuPage.toMeasurements();
                measurementsPage.toQuestionnaire(0);
            });

            it('should be possible to retry send reply when upload fails', function() {
                questionnairePage.toFirstQuestion();

                expect(questionnairePage.nodeHeading.getText()).toMatch(/Blodsukker/);
                bloodSugarPage.enterBloodSugarValue(12);
                questionnairePage.clickNext();

                expect(sendReplyPage.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
                sendReplyPage.clickSendReply();

                browser.sleep(1000); // wait to skip progress page
                expect(sendReplyPage.endPageErrorRetry.getText()).toMatch(/try again/);

                // first retry
                sendReplyPage.clickSendRetry();
                browser.sleep(1000);
                expect(sendReplyPage.endPageErrorRetry.getText()).toMatch(/try again/);

                // second retry
                sendReplyPage.clickSendRetry();
                browser.sleep(1000);
                expect(sendReplyPage.endPageConfirmReplySent.getText()).toMatch(/Measurements \/ replies received/);
            });

            it('should be possible to cancel and go back to menu when upload fails', function() {
                questionnairePage.toFirstQuestion();

                expect(questionnairePage.nodeHeading.getText()).toMatch(/Blodsukker/);
                bloodSugarPage.enterBloodSugarValue(12);
                questionnairePage.clickNext();

                expect(sendReplyPage.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
                sendReplyPage.clickSendReply();

                browser.sleep(1000); // wait to skip progress page
                expect(sendReplyPage.endPageErrorRetry.getText()).toMatch(/try again/);

                sendReplyPage.clickCancelRetry();

                expect(browser.getLocationAbsUrl()).toMatch(/\/menu/);
            });
        });
    });
}());
