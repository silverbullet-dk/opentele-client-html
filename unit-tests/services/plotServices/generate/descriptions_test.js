(function() {
    'use strict';

    describe('opentele.plotServices.generate.descriptions module', function() {

        beforeEach(module('opentele.plotServices.generate.descriptions'));

        describe('descriptions', function() {
            var descriptions;

            beforeEach(inject(function(_descriptions_) {
                descriptions = _descriptions_;
            }));

            describe('labelY', function() {

                it('should translate label', function() {
                    var resultLabel = descriptions.labelY('BPM');
                    expect(resultLabel).toEqual('Beats per minute');
                });

            });

            describe('legend', function() {

                it('should return empty object by default', function() {
                    var resultLegend = descriptions.legend('blood_pressure');
                    expect(resultLegend).toEqual({});
                });

                it('should return legend with three labels for blood sugar', function() {
                    var resultLegend = descriptions.legend('bloodsugar');
                    expect(resultLegend).toEqual({
                        show: true,
                        location: 'nw',
                        placement: 'insideGrid',
                        labels: [
                            'Before meal',
                            'After meal',
                            'Unknown'
                        ]
                    });
                });

                it('should return legend with seven labels for continuous blood sugar', function() {
                    var resultLegend = descriptions.legend('continuous_blood_sugar_measurement');
                    expect(resultLegend).toEqual({
                        show: true,
                        location: 'nw',
                        placement: 'insideGrid',
                        labels: [
                            'Continuous blood sugar',
                            'Blood sugar measurement',
                            'Insulin',
                            'Exercise',
                            'State of health',
                            'Meal',
                            'User defined'
                        ]
                    });
                });

            });

        });

    });
}());
