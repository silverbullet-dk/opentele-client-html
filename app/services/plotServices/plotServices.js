(function() {
    'use strict';

    var plotServices = angular.module('opentele.plotServices', [
        'opentele.plotServices.utils',
        'opentele.plotServices.augment',
        'opentele.plotServices.filters',
        'opentele.plotServices.tables',
        'opentele.plotServices.partition',
        'opentele.plotServices.generate',
        'opentele.plotServices.graphs'
    ]);

    plotServices.service('plotService', function($translate, utils, filters,
                                                 tables, graphs) {
        return {
            setGraphAndTableFlags: utils.setFlags,
            renderFilters: filters.render,
            renderTables: tables.render,
            renderGraphs: graphs.render
        };
    });

}());
