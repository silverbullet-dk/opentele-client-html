(function() {
    'use strict';

    var optionsServices = angular.module('opentele.plotServices.generate.options', [
        'opentele.plotServices',
        'opentele.plotServices.generate',
        'opentele.translations'
    ]);

    optionsServices.service('options', function ($translate, styles, descriptions) {

        var generateTitle = function(graphDescription) {
            return $translate.instant(graphDescription.title);
        };

        var generateGrid = function() {
            return {
                backgroundColor: '#CCCCCC',
                gridLineColor: '#999999'
            };
        };

        var generateSeriesStyle = function(type) {
            return styles.byType(type);
        };

        var generateLegend = function(type) {
            return descriptions.legend(type);
        };

        var generateAxes = function(graphDescription, jqplot) {
            var xaxis = {
                pad: 1.2,
                renderer: jqplot.DateAxisRenderer,
                rendererOptions: {
                    tickRenderer: jqplot.CanvasAxisTickRenderer
                },
                ticks: graphDescription.ticksX,
                tickOptions: {
                    formatString: graphDescription.formatStringX,
                    angle: -45
                }
            };

            var yaxis = {
                min: graphDescription.boundariesY.min,
                max: graphDescription.boundariesY.max,
                label: graphDescription.labelY,
                labelRenderer: jqplot.CanvasAxisLabelRenderer,
                ticks: graphDescription.ticksY,
                tickOptions: {
                    formatString: graphDescription.formatStringY
                }
            };

            return {
                xaxis: xaxis,
                yaxis: yaxis
            };
        };

        var generateHighlighter = function() {
            return {
                show: true,
                sizeAdjust: 7.5,
                tooltipOffset: 5,
                yvalues: 10,
                fadeTooltip: true
            };
        };

        var generateCursor = function() {
            return {
                show: false
            };
        };

        var byType = function(type, graphDescription, jqplot) {
            return {
                title: generateTitle(graphDescription),
                grid: generateGrid(),
                series: generateSeriesStyle(type),
                legend: generateLegend(type),
                axes: generateAxes(graphDescription, jqplot),
                highlighter: generateHighlighter(),
                cursor: generateCursor()
            };
        };

        return {
            byType: byType
        };

    });

}());
