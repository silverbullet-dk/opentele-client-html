(function() {
    'use strict';

    var MenuPage = function() {
        this.menuList = element(by.id('menu-list'));
        this.menuItems = element.all(by.binding('menuItem.name'));

        this.toMeasurements = function() {
            element.all(by.id('menu-items')).
                get(0).
                $('a').
                click();
        };

        this.toMessages = function() {
            element.all(by.id('menu-items')).
                get(1).
                $('a').
                click();
        };

        this.toAcknowledgements = function() {
            element.all(by.id('menu-items')).
                get(2).
                $('a').
                click();
        };

        this.toMyMeasurements = function() {
            element.all(by.id('menu-items')).
                get(3).
                $('a').
                click();
        };

        this.toChangePassword = function() {
            element.all(by.id('menu-items')).
                get(4).
                $('a').
                click();
        };
    };

    module.exports = new MenuPage();

}());
