(function() {
	'use strict';

	var SendReplyPage = function () {
		this.backButton = element(by.id('back-button'));

		this.endPageSendQuestionTextElement = element(by.id('send-reply-text'));
		this.endPageErrorRetry = element(by.id('send-reply-failed-text'));
		this.endPageConfirmReplySent = element(by.id('send-reply-ack-text'));

		this.clickSendReply = function() {
			element(by.id('send-reply-yes-button')).click();
		};

		this.clickCancelRetry = function() {
			element(by.id('failed-cancel-button')).click();
		};

		this.clickSendRetry = function() {
			element(by.id('failed-retry-button')).click();
		};

		this.waitToSkipProgressPage = function() {
			browser.sleep(1000);
		};

		this.assertSendReplyPage = function() {
			expect(this.endPageSendQuestionTextElement.getText()).toMatch(/send your measurements/);
		};

		this.assertReplySent = function() {
			expect(this.endPageConfirmReplySent.getText()).toMatch(/Measurements.*replies.*received/);
		};
	};

	module.exports = new SendReplyPage();
}());
