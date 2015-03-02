(function() {
    'use strict';

    describe('walk through and fill out questionnaire containing delay nodes', function () {
        var loginPage = require('../../login/loginPage.js');
        var menuPage = require('../../menu/menuPage.js');
        var measurementsPage = require('../performMeasurementsPage.js');
        var questionnairePage = require('../questionnairePage.js');
        var ioNodePage = require('./ioNodePage.js');
        var delayNodePage = require('./delayNodePage.js');

        beforeEach(function () {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMeasurements();
            measurementsPage.toQuestionnaire(21);
        });

        it('should show questionnaire', function () {
            ioNodePage.headings.then(function(items) {
                expect(items.length).toBe(1);
                expect(items[0].getText()).toMatch(/3 sekunder/);
            });
        });

        it('should navigate to first delay node', function () {
            questionnairePage.clickCenterButton();
            expect(delayNodePage.heading.getText()).toMatch(/Nedtælling på 3 sek/);
            expect(delayNodePage.timerDescription.getText()).toMatch(/Time left/);
        });

        it('should navigate to second delay node and beyond', function () {
            questionnairePage.clickCenterButton();
            expect(delayNodePage.heading.getText()).toMatch(/Nedtælling på 3 sek/);
            expect(delayNodePage.timerDescription.getText()).toMatch(/Time left/);
            browser.wait(function () {
                return delayNodePage.timerDescription !== undefined &&
                    delayNodePage.timerDescription.getText().then(function (text) {
                        return text.match(/Time passed/);
                    });
            }).then(function () {
                expect(delayNodePage.timerDescription.getText()).toMatch(/Time passed/);
            });
        });

    });

}());