(function() {
    'use strict';

    describe('measurement', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var myMeasurementsPage = require("./myMeasurementsPage.js");
        var measurementPage = require("./measurementPage.js");

        beforeEach(function() {
            loginPage.get();
            loginPage.doLogin('nancyann', 'abcd1234');
            menuPage.toMyMeasurements();
        });

        var BLOOD_PRESSURE_INDEX = 0;
        var URINE_INDEX = 1;
        var BLOOD_SUGAR_INDEX = 7;
        var CONTINUOUS_BLOOD_SUGAR_INDEX = 9;
        var SHOW_ALL_INDEX = 4;

        it('should navigate to protein in urine measurement', function() {
            myMeasurementsPage.toMeasurement(URINE_INDEX);
            expect(measurementPage.subtitle.getText()).toMatch('Protein in urine');
        });

        it('protein in urine should have one table visible', function() {
            myMeasurementsPage.toMeasurement(URINE_INDEX);
            measurementPage.pressFilterButton(SHOW_ALL_INDEX);
            expect(measurementPage.isTableIsVisible()).toEqual(true);
            expect(measurementPage.isStandardDayTableVisible()).toEqual(false);
            measurementPage.getGraphsVisible().then(function(elements) {
                expect(elements.length).toEqual(0);
            });
        });

        it('blood pressure should have one table and one graph visible', function() {
            myMeasurementsPage.toMeasurement(BLOOD_PRESSURE_INDEX);
            measurementPage.pressFilterButton(SHOW_ALL_INDEX);
            expect(measurementPage.isTableIsVisible()).toEqual(true);
            expect(measurementPage.isStandardDayTableVisible()).toEqual(false);
            measurementPage.getGraphsVisible().then(function(elements) {
                expect(elements.length).toEqual(1);
            });
        });

        it('blood sugar should have one special table and two graphs visible', function() {
            myMeasurementsPage.toMeasurement(BLOOD_SUGAR_INDEX);
            measurementPage.pressFilterButton(SHOW_ALL_INDEX);
            expect(measurementPage.isTableIsVisible()).toEqual(false);
            expect(measurementPage.isStandardDayTableVisible()).toEqual(true);
            measurementPage.getGraphsVisible().then(function(elements) {
                expect(elements.length).toEqual(2);
            });
        });

        it('continuous blood sugar should have no tables and two graphs visible', function() {
            myMeasurementsPage.toMeasurement(CONTINUOUS_BLOOD_SUGAR_INDEX);
            measurementPage.pressFilterButton(SHOW_ALL_INDEX);
            expect(measurementPage.isTableIsVisible()).toEqual(false);
            measurementPage.getGraphsVisible().then(function(elements) {
                expect(elements.length).toEqual(2);
            });
        });

    });
}());