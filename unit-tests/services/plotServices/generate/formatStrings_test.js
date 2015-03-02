(function() {
    'use strict';

    describe('opentele.plotServices.generate.formatStrings module', function() {

        beforeEach(module('opentele.plotServices.generate.formatStrings'));

        describe('formatStrings', function() {
            var formatStrings;

            beforeEach(inject(function(_formatStrings_) {
                formatStrings = _formatStrings_;
            }));

            describe('xStandardDay', function() {

                it('should return hours and minutes format string', function() {
                    var resultFormatString = formatStrings.xStandardDay();
                    expect(resultFormatString).toEqual('%I:%M %p');
                });

            });

            describe('x', function() {

                it('should return day, month and year format string', function() {
                    var resultFormatString = formatStrings.x();
                    expect(resultFormatString).toEqual('%d/%m/%Y');
                });

            });

            describe('y', function() {

                it('should return integer format string in the default case', function() {
                    var resultFormatString = formatStrings.y('pulse');
                    expect(resultFormatString).toEqual('%i');
                });

                it('should return float format string when type is lung function', function() {
                    var resultFormatString = formatStrings.y('lung_function');
                    expect(resultFormatString).toEqual('%.1f');
                });

                it('should return float format string when type is cont. blood sugar', function() {
                    var resultFormatString = formatStrings.y('continuous_blood_sugar_measurement');
                    expect(resultFormatString).toEqual('%.1f');
                });

            });

        });
    });
}());
