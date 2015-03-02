(function() {
    'use strict';

    var QuestionnairePage = function () {
        var sendReplyPage = require('./SendReplyPage.js');

        this.divForQuestionHtml = element(by.id('question-text'));
        this.nodeHeading = element(by.css('h2'));
        this.backButton = element(by.id('back-button'));
        this.leftButton = element(by.id('question-left-button'));
        this.centerButton = element(by.id('question-center-button'));
        this.rightButton = element(by.id('question-right-button'));

        this.clickLeftButton = function () {
            this.leftButton.click();
        };

        this.clickCenterButton = function () {
            this.centerButton.click();
        };

        this.clickRightButton = function () {
            this.rightButton.click();
        };

        this.toFirstQuestion = function() {
            this.clickCenterButton();
        };

        this.clickNext = function() {
            this.clickRightButton();
        };

        this.clickOmit = function() {
            this.clickLeftButton();
        };

        this.assertNextButtonDisabled = function() {
            expect(this.rightButton.isEnabled()).toBe(false);
        };

        this.assertCorrectHeading = function(expected) {
            expect(this.nodeHeading.getText()).toMatch(new RegExp(expected, 'g'));
        };

        this.assertCanSendReply = function() {
            sendReplyPage.assertSendReplyPage();
            sendReplyPage.clickSendReply();

            sendReplyPage.waitToSkipProgressPage();
            sendReplyPage.assertReplySent();
        };
    };

    module.exports = new QuestionnairePage();

}());
