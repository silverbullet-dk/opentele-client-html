(function() {
    'use strict';

    var MeasurementPage = function () {
        this.menuButton = element(by.id('menu-button'));
        this.title = element(by.css('.title'));
        this.subtitle = element(by.binding('model.measurement.name'));

        this.pressFilterButton = function (index) {
            element.all(by.css('.narrow-button')).
                get(index).
                click();
        };

        this.getGraphsVisible = function () {
            return element.all(by.css('.jqplot-target'));
        };

        this.isTableIsVisible = function () {
            return element(by.id('measurements-table')).isDisplayed();
        };

        this.isStandardDayTableVisible = function () {
            return element(by.id('standard-day-measurements-table')).isDisplayed();
        };
    };

    module.exports = new MeasurementPage();

}());
