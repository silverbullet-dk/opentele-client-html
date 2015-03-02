(function() {
    'use strict';

    var ticksServices = angular.module('opentele.plotServices.generate.ticks', [
        'opentele.plotServices',
        'opentele.plotServices.generate'
    ]);

    ticksServices.service('ticks', function(filters, utils) {

        var xStandardDay = function() {
            var ticks = [];
            for (var i = 0; i < 24; i++) {
                var date = new Date('1970-01-03T00:00:00+02:00'); // arbitrary date
                date.setHours(i);
                date.setMinutes(0);
                ticks.push(date);
            }
            var midnight = new Date('1970-01-03T00:00:00+02:00'); // arbitrary date
            midnight.setHours(23);
            midnight.setMinutes(59);
            ticks.push(midnight);
            return ticks;
        };

        var x = function(now, filter) {

            var addDays = function(startDate, days) {
                var date = new Date(startDate);
                date.setDate(date.getDate() + days);
                return date;
            };

            var getDates = function(startDate, stopDate, interval) {
                var dateArray = [];
                var currentDate = startDate;
                while (currentDate <= stopDate) {
                    dateArray.push(new Date(currentDate));
                    currentDate = addDays(currentDate, 1 + interval);
                }
                return dateArray;
            };

            var generateTicksX = function(now, length, interval) {
                var ticksX = getDates(addDays(now, length), now, interval);
                ticksX.push(addDays(now, 1));
                return ticksX;
            };

            switch (filter) {
            case filters.WEEK:
                var weekLength = -7;
                var weekInterval = 0;
                return generateTicksX(now, weekLength, weekInterval);
            case filters.MONTH:
                var monthLength = -31;
                var monthInterval = 0;
                return generateTicksX(now, monthLength, monthInterval);
            case filters.QUARTER:
                var quarterLength = -92;
                var quarterInterval = 4;
                return generateTicksX(now, quarterLength, quarterInterval);
            case filters.YEAR:
                var yearLength = -366;
                var yearInterval = 18;
                return generateTicksX(now, yearLength, yearInterval);
            case filters.ALL:
                return []; // let jqplot figure it out for itself
            default:
                console.log("Unknown filter: " + filter);
                return [];
            }
        };

        var y = function(min, max, type) {

            var start = 0;
            var stop = 0;
            var interval = 0;

            var generateRangeBounds = function(aStart, aStop, anInterval) {
                start = aStart;
                stop = aStop;
                interval = anInterval;
                if (min < start) {
                    start = Math.floor(min / interval) * interval;
                }
                if (max > stop) {
                    stop = Math.ceil(max / interval) * interval;
                }
            };

            var generateRange = function(start, stop, interval) {
                var range = [];
                while (start < stop) {
                    range.push(start);
                    start += interval;
                }
                range.push(stop);
                return range;
            };

            switch (type) {
            case utils.types.BLOOD_PRESSURE:
                generateRangeBounds(40, 200, 20);
                break;
            case utils.types.TEMPERATURE:
                generateRangeBounds(35, 40, 0.5);
                break;
            case utils.types.PULSE:
                generateRangeBounds(50, 130, 10);
                break;
            case utils.types.WEIGHT:
                generateRangeBounds(40, 200, 20);
                break;
            case utils.types.HEMOGLOBIN:
                generateRangeBounds(5, 11, 0.5);
                break;
            case utils.types.SATURATION:
                generateRangeBounds(80, 100, 5);
                break;
            case utils.types.CRP:
                // CRP values can get insanely high, so we have to adjust to
                // potentially very high maximum values here
                var tickSize = 10;
                while (true) {
                    if (max <= tickSize * 10) {
                        start = 0;
                        stop = tickSize * 10;
                        interval = tickSize;
                        break;
                    }
                    tickSize *= 10;
                }
                break;
            case utils.types.BLOOD_SUGAR:
                interval = 2;
                start = Math.floor(min - 1);
                if (start < 0) {
                    start = 0;
                }
                stop = Math.ceil(max + interval);
                break;
            case utils.types.LUNG_FUNCTION:
                generateRangeBounds(2, 5, 0.5);
                break;
            case utils.types.CONTINUOUS_BLOOD_SUGAR:
                interval = 2;
                start = Math.floor(min - 1);
                if (start < 0) {
                    start = 0;
                }
                stop = Math.ceil(max + interval);
                break;
            default:
                console.log("Unknown type: " + type);
                break;
            }

            return generateRange(start, stop, interval);
        };

        return {
            xStandardDay: xStandardDay,
            x: x,
            y: y
        };

    });

}());
