(function() {
    'use strict';

    var descriptionsServices = angular.module('opentele.plotServices.generate.descriptions', [
        'opentele.plotServices',
        'opentele.plotServices.generate',
        'opentele.translations'
    ]);

    descriptionsServices.service('descriptions', function ($translate, utils) {

        var labelY = function(unit) {
            return $translate.instant(unit);
        };

        var legend = function(type) {
            switch (type) {

                case utils.types.BLOOD_SUGAR:
                    return {
                        show: true,
                        location: 'nw',
                        placement: 'insideGrid',
                        labels: [
                            $translate.instant('BEFORE_MEAL'),
                            $translate.instant('AFTER_MEAL'),
                            $translate.instant('UNKNOWN')
                        ]
                    };

                case utils.types.CONTINUOUS_BLOOD_SUGAR:
                    return {
                        show: true,
                        location: 'nw',
                        placement: 'insideGrid',
                        labels: [
                            $translate.instant('CONTINUOUS_BLOOD_SUGAR_MEASUREMENT'),
                            $translate.instant('COULOMETER_READING'),
                            $translate.instant('INSULIN'),
                            $translate.instant('EXERCISE'),
                            $translate.instant('STATE_OF_HEALTH'),
                            $translate.instant('MEAL'),
                            $translate.instant('GENERIC')
                        ]
                    };

                default:
                    return {};
            }
        };

        return {
            labelY: labelY,
            legend: legend
        };

    });

}());
