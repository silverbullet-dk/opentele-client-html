(function() {
    'use strict';

    describe('opentele.plotServices.generate module', function () {

        beforeEach(module('opentele.plotServices.generate'));

        describe('generate', function() {
            var generate;

            beforeEach(inject(function(_generate_) {
                generate = _generate_;
            }));

            it('should have the expected properties', function() {
                expect(generate.hasOwnProperty('ticksX')).toEqual(true);
                expect(generate.hasOwnProperty('ticksXStandardDay')).toEqual(true);
                expect(generate.hasOwnProperty('ticksY')).toEqual(true);

                expect(generate.hasOwnProperty('series')).toEqual(true);
                expect(generate.hasOwnProperty('standardDaySeries')).toEqual(true);

                expect(generate.hasOwnProperty('boundariesY')).toEqual(true);

                expect(generate.hasOwnProperty('formatStringXStandardDay')).toEqual(true);
                expect(generate.hasOwnProperty('formatStringX')).toEqual(true);
                expect(generate.hasOwnProperty('formatStringY')).toEqual(true);

                expect(generate.hasOwnProperty('labelY')).toEqual(true);

                expect(generate.hasOwnProperty('options')).toEqual(true);
            });
        });

    });
}());
