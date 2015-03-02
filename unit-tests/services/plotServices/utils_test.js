(function() {
    'use strict';

    describe('opentele.plotServices.utils module', function() {

        beforeEach(module('opentele.plotServices.utils'));

        describe('utils', function() {
            var utils;

            beforeEach(inject(function(_utils_) {
                utils = _utils_;
            }));

            it('should have the expected constants defined', function() {
                expect(utils.types.BLOOD_PRESSURE).toEqual('blood_pressure');
                expect(utils.types.TEMPERATURE).toEqual('temperature');
                expect(utils.types.PROTEIN_IN_URINE).toEqual('urine');
                expect(utils.types.GLUCOSE_IN_URINE).toEqual('urine_glucose');
                expect(utils.types.PULSE).toEqual('pulse');
                expect(utils.types.WEIGHT).toEqual('weight');
                expect(utils.types.HEMOGLOBIN).toEqual('hemoglobin');
                expect(utils.types.SATURATION).toEqual('saturation');
                expect(utils.types.CRP).toEqual('crp');
                expect(utils.types.BLOOD_SUGAR).toEqual('bloodsugar');
                expect(utils.types.LUNG_FUNCTION).toEqual('lung_function');
                expect(utils.types.CONTINUOUS_BLOOD_SUGAR).toEqual('continuous_blood_sugar_measurement');
            });

            it('should set flags on model as expected for default type', function() {
                var model = {};
                var type = 'blood_pressure';
                utils.setFlags(model, type);
                expect(model.shouldHideGraph).toEqual(false);
                expect(model.shouldHideTable).toEqual(false);
            });

            it('should set flags on model as expected for urine type', function() {
                var model = {};
                var type = 'urine';
                utils.setFlags(model, type);
                expect(model.shouldHideGraph).toEqual(true);
                expect(model.shouldHideTable).toEqual(false);
            });

            it('should set flags on model as expected for urine glucose type', function() {
                var model = {};
                var type = 'urine_glucose';
                utils.setFlags(model, type);
                expect(model.shouldHideGraph).toEqual(true);
                expect(model.shouldHideTable).toEqual(false);
            });

            it('should set flags on model as expected for cont. blood sugar type', function() {
                var model = {};
                var type = 'continuous_blood_sugar_measurement';
                utils.setFlags(model, type);
                expect(model.shouldHideGraph).toEqual(false);
                expect(model.shouldHideTable).toEqual(true);
            });

        });
    });
}());