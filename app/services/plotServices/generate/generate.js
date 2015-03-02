(function() {
    'use strict';

    var generateServices = angular.module('opentele.plotServices.generate', [
        'opentele.plotServices',
        'opentele.plotServices.generate.boundaries',
        'opentele.plotServices.generate.descriptions',
        'opentele.plotServices.generate.formatStrings',
        'opentele.plotServices.generate.options',
        'opentele.plotServices.generate.series',
        'opentele.plotServices.generate.styles',
        'opentele.plotServices.generate.ticks'
    ]);

    generateServices.service('generate', function(boundaries, descriptions,
                                                  formatStrings, options,
                                                  series, ticks) {

        return {

            ticksX: ticks.x,
            ticksXStandardDay: ticks.xStandardDay,
            ticksY: ticks.y,

            series: series.general,
            standardDaySeries: series.standardDay,

            boundariesY: boundaries.y,

            formatStringXStandardDay: formatStrings.xStandardDay,
            formatStringX: formatStrings.x,
            formatStringY: formatStrings.y,

            labelY: descriptions.labelY,

            options: options.byType

        };

    });

}());
