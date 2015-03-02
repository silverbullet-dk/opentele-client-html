(function() {
    'use strict';

    var utilsServices = angular.module('opentele.plotServices.utils', [
    ]);

    utilsServices.service('utils', function() {

        var types = {
            BLOOD_PRESSURE: 'blood_pressure',
            TEMPERATURE: 'temperature',
            PROTEIN_IN_URINE: 'urine',
            GLUCOSE_IN_URINE: 'urine_glucose',
            PULSE: 'pulse',
            WEIGHT: 'weight',
            HEMOGLOBIN: 'hemoglobin',
            SATURATION: 'saturation',
            CRP: 'crp',
            BLOOD_SUGAR: 'bloodsugar',
            LUNG_FUNCTION: 'lung_function',
            CONTINUOUS_BLOOD_SUGAR: 'continuous_blood_sugar_measurement'
        };

        var setFlags = function(model, type) {
            model.shouldHideGraph = false;
            model.shouldHideTable = false;
            switch (type) {
                case types.PROTEIN_IN_URINE:
                    model.shouldHideGraph = true;
                    break;
                case types.GLUCOSE_IN_URINE:
                    model.shouldHideGraph = true;
                    break;
                case types.CONTINUOUS_BLOOD_SUGAR:
                    model.shouldHideTable = true;
                    break;
            }
        };

        return {
            setFlags: setFlags,
            types: types
        };

    });

}());
