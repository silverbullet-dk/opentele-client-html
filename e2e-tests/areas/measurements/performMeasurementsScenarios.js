(function() {
    'use strict';

    describe('perform measurements', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var performMeasurementsPage = require("../measurements/performMeasurementsPage.js");

        describe('when authenticated', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                browser.executeScript('window.Native = {' +
                    'getQuestionnairesToHighlight: function() {' +
                    'return \'["Blodtryk (manuel)", "Proteinindhold i urin"]\';' +
                    '},' +
                    'clearRemindersForQuestionnaire: function(questionnaireName) { }' +
                    '};');
                menuPage.toMeasurements();
            });

            it('should navigate to measurements page', function() {
                expect(performMeasurementsPage.questionnaireList).toBeDefined();
            });

            it('should show list of questionnaires', function() {
                performMeasurementsPage.questionnaireNames.then(function(names) {
                    expect(names.length).toEqual(28);
                    expect(names[0].getText()).toMatch(/Blodsukker/i);
                    expect(names[2].getText()).toMatch(/Hæmoglobin/i);
                });
            });

            it('should show two questionnaires as marked', function() {
                browser.waitForAngular();
                performMeasurementsPage.questionnaireNames.then(function(names) {
                    expect(names[3].getAttribute('class')).toMatch(/marked-button/i);
                    expect(names[4].getAttribute('class')).not.toMatch(/marked-button/i);
                    expect(names[5].getAttribute('class')).toMatch(/marked-button/i);
                });
            });

            it ('should redirect to questionnaire page when questionnaire clicked', function() {
                performMeasurementsPage.toQuestionnaire(0);

                expect(browser.getLocationAbsUrl()).toMatch(/\/questionnaire/);
            });
        });

        describe('patient with only one questionnaire assigned', function() {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('rene', '1234');
            });

            it('should automatically redirect to questionnaire', function () {
                menuPage.toMeasurements();

                expect(browser.getLocationAbsUrl()).toMatch(/\/questionnaire/);
            });

        });

        describe('when not authenticated', function() {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('measurements401', '1234');
            });

            it('should redirect to login page', function() {
                menuPage.toMeasurements();

                expect(browser.getLocationAbsUrl()).toMatch("/login");
            });
        });
    });
}());
