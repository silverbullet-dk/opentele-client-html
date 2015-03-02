(function() {
    'use strict';

    var stylesServices = angular.module('opentele.plotServices.generate.styles', [
        'opentele.plotServices',
        'opentele.plotServices.generate'
    ]);

    stylesServices.service('styles', function(utils) {

        var colors = {
            blue: '#4076E7',
            red: '#E73F38',
            black: '#333333',
            yellow: '#F5F25B',
            magenta: '#DE5BF5',
            green: '#4AFA39',
            orange: '#FFAF19'
        };

        var tooltips = {
            date: '%3$s %4$s',
            intValue: '%2$i',
            floatValue: '%2$.1f',
            insulinType: '%5$s',
            insulinUnits: '%6$s',
            exerciseType: '%5$s',
            exerciseDurationInMinutes: '%6$s',
            exerciseIntensity: '%7$s',
            stateOfHealth: '%5$s',
            mealCarboGrams: '%5$s',
            mealFoodType: '%6$s',
            genericIndicatedEvent: '%5$s'
        };

        var generateSeriesStyle = function(color, showLine, values) {

            var formatString = '<div>';
            values.forEach(function(value, index) {
                if (index === values.length - 1) {
                    formatString += value + '</div>';
                } else {
                    formatString += value + ', ';
                }
            });

            return {
                color: color,
                showLine: showLine,
                highlighter: {
                    formatString: formatString
                }
            };
        };

        var generateLungFunctionStyle = function() {
            return [
                generateSeriesStyle(colors.blue, true, [tooltips.date, tooltips.floatValue])
            ];
        };

        var generateBloodPressureStyle = function() {
            return [
                generateSeriesStyle(colors.blue, true, [tooltips.date, tooltips.intValue]),
                generateSeriesStyle(colors.red, true, [tooltips.date, tooltips.intValue])
            ];
        };

        var generateBloodSugarStyle = function() {
            return [
                generateSeriesStyle(colors.blue, false, [tooltips.date, tooltips.intValue]),
                generateSeriesStyle(colors.red, false, [tooltips.date, tooltips.intValue]),
                generateSeriesStyle(colors.black, false, [tooltips.date, tooltips.intValue])
            ];
        };

        var generateContinuousBloodSugarStyle = function() {
            return [
                generateSeriesStyle(colors.blue, false, [tooltips.date, tooltips.floatValue]),
                generateSeriesStyle(colors.yellow, false, [tooltips.date, tooltips.floatValue]),
                generateSeriesStyle(colors.green, false, [tooltips.date, tooltips.insulinType, tooltips.insulinUnits]),
                generateSeriesStyle(colors.black, false, [tooltips.date, tooltips.exerciseType, tooltips.exerciseDurationInMinutes, tooltips.exerciseIntensity]),
                generateSeriesStyle(colors.magenta, false, [tooltips.date, tooltips.stateOfHealth]),
                generateSeriesStyle(colors.red, false, [tooltips.date, tooltips.mealCarboGrams, tooltips.mealFoodType]),
                generateSeriesStyle(colors.orange, false, [tooltips.date, tooltips.genericIndicatedEvent])
            ];
        };

        var generateDefaultStyle = function() {
            return [
                generateSeriesStyle(colors.blue, true, [tooltips.date, tooltips.intValue])
            ];
        };

        var byType = function (type) {
            switch (type) {
                case utils.types.LUNG_FUNCTION:
                    return generateLungFunctionStyle();
                case utils.types.BLOOD_SUGAR:
                    return generateBloodSugarStyle();
                case utils.types.BLOOD_PRESSURE:
                    return generateBloodPressureStyle();
                case utils.types.CONTINUOUS_BLOOD_SUGAR:
                    return generateContinuousBloodSugarStyle();
                default:
                    return generateDefaultStyle();
            }
        };

        return {
            byType: byType
        };

    });

}());
