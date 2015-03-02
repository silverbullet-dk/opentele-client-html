(function() {
    'use strict';

    var graphsServices = angular.module('opentele.plotServices.graphs', [
        'opentele.plotServices'
    ]);

    graphsServices.service('graphs', function(generate, augment, utils) {

        var resetGraphs = function(model) {
            model.series = null;
            model.options = {};
            model.standardDaySeries = null;
            model.standardDayOptions = {};
        };

        var renderGraph = function(model, currentMeasurement, filter) {
            var unit = currentMeasurement.unit;
            var type = currentMeasurement.type;
            var measurements = currentMeasurement.measurements;

            var boundariesY = generate.boundariesY(measurements, type);
            var ticksX = generate.ticksX(new Date(), filter);
            var ticksY = generate.ticksY(boundariesY.min, boundariesY.max, type);
            var formatStringX = generate.formatStringX();
            var formatStringY = generate.formatStringY(type);
            var labelY = generate.labelY(unit);

            var graphDescription = {
                title: model.measurement.name,
                boundariesY: boundariesY,
                ticksX: ticksX,
                ticksY: ticksY,
                formatStringX: formatStringX,
                formatStringY: formatStringY,
                labelY: labelY
            };

            measurements = augment.withDateAndTime(measurements);
            model.series = generate.series(measurements, type);
            model.options = generate.options(type, graphDescription, $.jqplot);
        };

        var renderStandardDayGraph = function(model, currentMeasurement) {
            var unit = currentMeasurement.unit;
            var type = currentMeasurement.type;
            var measurements = currentMeasurement.measurements;

            var boundariesY = generate.boundariesY(measurements, type);
            var ticksX = generate.ticksXStandardDay();
            var ticksY = generate.ticksY(boundariesY.min, boundariesY.max, type);
            var formatStringX = generate.formatStringXStandardDay();
            var formatStringY = generate.formatStringY(type);
            var labelY = generate.labelY(unit);

            var graphDescription = {
                title: 'STANDARD_DAY',
                boundariesY: boundariesY,
                ticksX: ticksX,
                ticksY: ticksY,
                formatStringX: formatStringX,
                formatStringY: formatStringY,
                labelY: labelY
            };

            measurements = augment.withDateAndTime(measurements);
            measurements = augment.withNormalizedDates(measurements);
            model.standardDaySeries = generate.standardDaySeries(measurements, type);
            model.standardDayOptions = generate.options(type, graphDescription, $.jqplot);
        };

        var render = function (model, currentMeasurement, filter) {

            resetGraphs(model);
            if (model.shouldHideGraph) {
                return;
            }

            renderGraph(model, currentMeasurement, filter);
            if (currentMeasurement.type === utils.types.BLOOD_SUGAR ||
                currentMeasurement.type === utils.types.CONTINUOUS_BLOOD_SUGAR) {
                renderStandardDayGraph(model, currentMeasurement);
            }

        };

        return {
            render: render
        };

    });

}());
