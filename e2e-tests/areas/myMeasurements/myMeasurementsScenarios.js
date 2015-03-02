(function() {
    'use strict';

    describe('myMeasurements', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var myMeasurementsPage = require("./myMeasurementsPage.js");

        describe('when authenticated', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                menuPage.toMyMeasurements();
            });

            it('should navigate to my measurement page', function() {
                expect(browser.getLocationAbsUrl()).toMatch("/my_measurements");
                expect(myMeasurementsPage.title.getText()).toMatch('My measurements');
                expect(myMeasurementsPage.measurementsList).toBeDefined();
            });

            it('should show list of measurements names', function() {
                myMeasurementsPage.measurementNames.then(function(names) {
                    expect(names.length).toEqual(10);
                    expect(names[0].getText()).toMatch(/Blood pressure/i);
                    expect(names[4].getText()).toMatch(/Weight/i);
                    expect(names[8].getText()).toMatch(/Lung function/i);
                });
            });

            it ('should redirect to measurement page when measurement clicked', function() {
                myMeasurementsPage.toMeasurement(2);
                expect(browser.getLocationAbsUrl()).toMatch(/\/measurement/);
            });

        });

        describe('patient with only one measurement available', function() {
            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('rene', '1234');
            });

            it('should automatically redirect to measurement', function () {
                menuPage.toMyMeasurements();
                expect(browser.getLocationAbsUrl()).toMatch(/\/measurement/);
            });
        });

        describe('when authenticated with no measurements', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('measurementsNoMeasurements', '1234');
            });

            it('should see no measurements page', function() {
                menuPage.menuItems.then(function(names) {
                    expect(names.indexOf('My measurements')).toEqual(-1);
                });
            });
        });

    });
}());