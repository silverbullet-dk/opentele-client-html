(function() {
    'use strict';

    var headerServices = angular.module('opentele.stateServices.headerServices', []);

    headerServices.service('headerService', function() {
        var header = true;
        var back = false;
        var mainMenu = true;

        return {
            setHeader: function(value) {
                header = value;
            },
            getHeader: function() {
                return header;
            },

            setBack: function(value) {
                back = value;
            },
            getBack: function() {
                return back;
            },

            setMainMenu: function(value) {
                mainMenu = value;
            },
            getMainMenu: function() {
                return mainMenu;
            }
        };
    });

}());
