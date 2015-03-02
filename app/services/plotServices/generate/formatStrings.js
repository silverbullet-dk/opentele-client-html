(function() {
    'use strict';

    var formatStringsServices = angular.module('opentele.plotServices.generate.formatStrings', [
        'opentele.plotServices',
        'opentele.plotServices.generate'
    ]);

    formatStringsServices.service('formatStrings', function ($translate, utils) {

        var xStandardDay = function() {
            return $translate.instant('MEASUREMENT_FORMAT_STANDARD_DAY_DATE');
        };

        var x = function() {
            return $translate.instant("MEASUREMENT_FORMAT_GENERAL_DATE");
        };

        var y = function(type) {
            if (type === utils.types.LUNG_FUNCTION ||
                type === utils.types.CONTINUOUS_BLOOD_SUGAR) {
                return '%.1f';
            } else {
                return '%i';
            }
        };

        return {
            xStandardDay: xStandardDay,
            x: x,
            y: y
        };

    });

}());
