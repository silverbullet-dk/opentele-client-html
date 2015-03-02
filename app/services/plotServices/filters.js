(function() {
    'use strict';

    var filterServices = angular.module('opentele.plotServices.filters', [
    ]);

    filterServices.service('filters', function() {

        var filters = {
            WEEK: 'WEEK',
            MONTH: 'MONTH',
            QUARTER: 'QUARTER',
            YEAR: 'YEAR',
            ALL: 'ALL'
        };

        var render = function(model) {
            model.filters = [
                {
                    label: 'SHOW_1_WEEK',
                    filter: filters.WEEK
                },
                {
                    label: 'SHOW_1_MONTH',
                    filter: filters.MONTH
                },
                {
                    label: 'SHOW_3_MONTHS',
                    filter: filters.QUARTER
                },
                {
                    label: 'SHOW_1_YEAR',
                    filter: filters.YEAR
                },
                {
                    label: 'SHOW_ALL',
                    filter: filters.ALL
                }
            ];
        };

        return {
            WEEK: filters.WEEK,
            MONTH: filters.MONTH,
            QUARTER: filters.QUARTER,
            YEAR: filters.YEAR,
            ALL: filters.ALL,
            render: render
        };

    });

}());
