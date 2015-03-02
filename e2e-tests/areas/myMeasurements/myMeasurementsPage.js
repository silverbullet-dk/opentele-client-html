(function() {
    'use strict';

    var MyMeasurementsPage = function () {
        this.menuButton = element(by.id('menu-button'));
        this.title = element(by.css('.title'));
        this.measurementsList = element(by.id('measurements-list'));
        this.measurementNames = element.all(by.binding('measurementRef.name'));

        this.get = function () {
            browser.get('index.html#/my_measurements');
        };

        this.toMeasurement = function(index) {
            element.all(by.id('measurements-items')).
                get(index).
                $('a').
                click();
        };
    };

    module.exports = new MyMeasurementsPage();

}());
