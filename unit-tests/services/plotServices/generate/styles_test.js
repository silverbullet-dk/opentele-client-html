(function() {
    'use strict';

    describe('opentele.plotServices.generate.styles module', function() {

        beforeEach(module('opentele.plotServices.generate.styles'));

        describe('styles', function() {
            var styles;

            beforeEach(inject(function(_styles_) {
                styles = _styles_;
            }));

            describe('byType', function() {

                it('should return expected default style', function() {
                    var resultStyle = styles.byType('pulse');
                    expect(resultStyle).toEqual([{
                        color: '#4076E7',
                        showLine: true,
                        highlighter: {
                            formatString: '<div>%3$s %4$s, %2$i</div>'
                        }
                    }]);
                });

                it('should return expected lung function style', function() {
                    var resultStyle = styles.byType('lung_function');
                    expect(resultStyle).toEqual([{
                        color: '#4076E7',
                        showLine: true,
                        highlighter: {
                            formatString: '<div>%3$s %4$s, %2$.1f</div>'
                        }
                    }]);
                });

                it('should return expected blood pressure style', function() {
                    var resultStyle = styles.byType('blood_pressure');
                    expect(resultStyle).toEqual([
                        {
                            color: '#4076E7',
                            showLine: true,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$i</div>'
                            }
                        },
                        {
                            color: '#E73F38',
                            showLine: true,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$i</div>'
                            }
                        }
                    ]);

                });

                it('should return expected blood sugar style', function() {
                    var resultStyle = styles.byType('bloodsugar');
                    expect(resultStyle).toEqual([
                        {
                            color: '#4076E7',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$i</div>'
                            }
                        },
                        {
                            color: '#E73F38',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$i</div>'
                            }
                        },
                        {
                            color: '#333333',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$i</div>'
                            }
                        }
                    ]);

                });

                it('should return expected continuous blood sugar style', function() {
                    var resultStyle = styles.byType('continuous_blood_sugar_measurement');
                    expect(resultStyle).toEqual([
                        {
                            color: '#4076E7',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$.1f</div>'
                            }
                        },
                        {
                            color: '#F5F25B',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %2$.1f</div>'
                            }
                        },
                        {
                            color: '#4AFA39',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %5$s, %6$s</div>'
                            }
                        },
                        {
                            color: '#333333',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %5$s, %6$s, %7$s</div>'
                            }
                        },
                        {
                            color: '#DE5BF5',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %5$s</div>'
                            }
                        },
                        {
                            color: '#E73F38',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %5$s, %6$s</div>'
                            }
                        },
                        {
                            color: '#FFAF19',
                            showLine: false,
                            highlighter: {
                                formatString: '<div>%3$s %4$s, %5$s</div>'
                            }
                        }
                    ]);

                });

            });

        });

    });
}());
