(function() {
    'use strict';

    var PerformMeasurementsPage = function () {
        this.questionnaireList = element(by.id('questionnaire-list'));
        this.menuButton = element(by.id('menu-button'));
        this.questionnaireNames = element.all(by.binding('questionnaireRef.name'));
        this.title = element(by.css('.title'));

        this.get = function () {
            browser.get('index.html#/perform_measurements');
        };

        this.toQuestionnaire = function (index) {
            element.all(by.id('questionnaire-items')).
                get(index).
                $('a').
                click();
        };
    };

    module.exports = new PerformMeasurementsPage();

}());
