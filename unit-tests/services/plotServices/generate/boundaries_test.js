(function() {
    'use strict';

    describe('opentele.plotServices.generate.boundaries module', function() {

        beforeEach(module('opentele.plotServices.generate.boundaries'));

        describe('boundaries', function() {
            var boundaries;

            beforeEach(inject(function(_boundaries_) {
                boundaries = _boundaries_;
            }));

            describe('y', function() {

                it('should return expected default values when measurements is empty', function() {
                    expect(boundaries.y([], "pulse")).toEqual({ min: 1000, max: 0 });
                });

                it('should return expected values when measurement type is default', function() {
                    expect(boundaries.y([
                            { measurement: 2 },
                            { measurement: 17 },
                            { measurement: 11 }
                        ],
                        "lung_function")).toEqual({ min: 2, max: 17 });
                });

                it('should handle blood pressure measurements properly', function() {
                    expect(boundaries.y([
                            { measurement: { systolic: 120, diastolic: 70 } },
                            { measurement: { systolic: 139, diastolic: 54 } },
                            { measurement: { systolic: 160, diastolic: 65 } }
                        ],
                        "blood_pressure")).toEqual({ min: 54, max: 160 });
                });

                it('should handle blood sugar measurements properly', function() {
                    expect(boundaries.y([
                            { measurement: { value: 6 } },
                            { measurement: { value: 20 } },
                            { measurement: { value: 3 } }
                        ],
                        "bloodsugar")).toEqual({ min: 3, max: 20 });
                });

                it('should handle continuous blood sugar measurements properly', function() {
                    expect(boundaries.y([
                            { measurement: { value: 17.3 } },
                            { measurement: { value: 5.4 } },
                            { measurement: { value: 20.5 } }
                        ],
                        "continuous_blood_sugar_measurement")).toEqual({ min: 5.4, max: 20.5 });
                });
            });
        });
    });
}());
