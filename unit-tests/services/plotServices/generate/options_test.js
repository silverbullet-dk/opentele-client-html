(function() {
    'use strict';

    describe('opentele.plotServices.generate.options module', function () {

        beforeEach(module('opentele.plotServices.generate.options'));

        describe('options', function () {
            var options, graphDescription, jqplot;

            beforeEach(module(function($provide) {

                var styles = {
                    byType: function(type) {
                        return { from: 'styles' };
                    }
                };
                $provide.value('styles', styles);

                var descriptions = {
                    legend: function(type) {
                        return { from: 'descriptions' };
                    }
                };
                $provide.value('descriptions', descriptions);

            }));

            beforeEach(inject(function (_options_) {
                options = _options_;
            }));

            describe('byType', function() {

                beforeEach(function() {
                    graphDescription = {
                        title: 'MEASUREMENT_TYPE_PULSE',
                        ticksX: [1, 2, 3],
                        ticksY: [40, 80, 120, 160, 200],
                        formatStringX: '[formatStringX]',
                        formatStringY: '[formatStringY]',
                        labelY: 'Beats per minute',
                        boundariesY: {
                            min: 34,
                            max: 220
                        }
                    };

                    jqplot = {
                        DateAxisRenderer: {},
                        CanvasAxisTickRenderer: {},
                        CanvasAxisLabelRenderer: {}
                    };
                });

                it('should generate correct graph options', function() {
                    var resultOptions = options.byType('pulse', graphDescription, jqplot);
                    expect(resultOptions.title).toEqual('Pulse');
                    expect(resultOptions.grid).toEqual({
                        backgroundColor: '#CCCCCC',
                        gridLineColor: '#999999'
                    });
                    expect(resultOptions.series).toEqual({ from: 'styles' });
                    expect(resultOptions.legend).toEqual({ from: 'descriptions' });
                    expect(resultOptions.axes.xaxis.ticks).toEqual([1, 2, 3]);
                    expect(resultOptions.axes.xaxis.tickOptions.formatString).toEqual('[formatStringX]');
                    expect(resultOptions.axes.yaxis.ticks).toEqual([40, 80, 120, 160, 200]);
                    expect(resultOptions.axes.yaxis.label).toEqual('Beats per minute');
                    expect(resultOptions.axes.yaxis.tickOptions.formatString).toEqual('[formatStringY]');
                    expect(resultOptions.highlighter).toEqual({
                        show: true,
                        sizeAdjust: 7.5,
                        tooltipOffset: 5,
                        yvalues: 10,
                        fadeTooltip: true
                    });
                    expect(resultOptions.cursor).toEqual({
                        show: false
                    });
                });

            });

        });
    });
}());
