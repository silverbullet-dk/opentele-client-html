(function() {
    'use strict';

    var menu = angular.module('opentele.controllers.menu', [
        'ngRoute',
        'opentele.stateServices',
        'opentele.restApiServices',
        'opentele.translations'
    ]);

    menu.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/menu', {
                title: 'MENU',
                templateUrl: 'areas/menu/menu.html'
            });
    }]);

    menu.controller('MenuCtrl', function($scope, $location, $translate, appContext,
        headerService, messageThreads) {
        headerService.setHeader(true);
        headerService.setMainMenu(false);
        headerService.setBack(false);

        var user = appContext.currentUser.get();
        $scope.model = {};

        var hasLinkRelation = function(relation) {
            return user.hasOwnProperty('links') && user.links.hasOwnProperty(relation);
        };

        var updateUnreadMessages = function(menuItem) {
            messageThreads.unreadMessages(user, function(data) {
                menuItem.name = menuItem.name + " (" + data.unreadMessages + ")";
            });
        };

        var menuItems = [];
        if (hasLinkRelation('questionnaires')) {
            menuItems.push({
                url: "#/perform_measurements",
                name: $translate.instant("MENU_PERFORM_MEASUREMENTS")
            });
        }
        if (hasLinkRelation('messageThreads')) {
            var menuItem = {
                url: "#/messages",
                name: $translate.instant("MENU_MESSAGES")
            };
            menuItems.push(menuItem);
            updateUnreadMessages(menuItem);
        }
        if (hasLinkRelation('acknowledgements')) {
            menuItems.push({
                url: "#/acknowledgements",
                name: $translate.instant("MENU_ACKNOWLEDGEMENTS")
            });
        }
        if (hasLinkRelation('measurements')) {
            menuItems.push({
                url: "#/my_measurements",
                name: $translate.instant("MENU_MY_MEASUREMENTS")
            });
        }
        if (hasLinkRelation('password')) {
            menuItems.push({
                url: "#/change_password",
                name: $translate.instant("MENU_CHANGE_PASSWORD")
            });
        }

        $scope.model.menuItems = menuItems;

});
}());
