(function() {
    'use strict';

    describe('opentele.controllers.menu module', function() {

        beforeEach(module('opentele.controllers.menu'));
        beforeEach(module('opentele.stateServices'));

        describe('MenuCtrl positive', function() {
            var scope, appContext, messageThreads, runController, restServiceResult;

            beforeEach(module(function($provide) {

                restServiceResult = {
                    unreadMessages: 3
                };

                messageThreads = {
                    unreadMessages: function(user, onSuccess) {
                        onSuccess(restServiceResult);
                    }
                };
                $provide.value('messageThreads', messageThreads);
            }));

            // instantiate controller
            beforeEach(inject(function($rootScope, $controller, _appContext_, _headerService_, _messageThreads_) {
                appContext = _appContext_;
                appContext.currentUser.set({});
                scope = $rootScope.$new();
                runController = function() {
                    $controller('MenuCtrl', {
                        '$scope': scope,
                        'appContext': _appContext_,
                        'headerService': _headerService_,
                        'messageThreads': _messageThreads_
                    });
                };
            }));

            it('should have a $scope', function() {
                runController();

                expect(scope).toBeDefined();
            });

            it('should have menuItems', function() {
                runController();

                expect(scope.model.menuItems).toBeDefined();
            });

            it('should disable menu items if user has no link to area', function () {
                runController();

                expect(scope.model.menuItems.length).toBe(0);
            });

            it('should enable menu items if user has link to area', function () {
                appContext.currentUser.set({
                    links: {
                        questionnaires: "bla",
                        messageThreads: "bla",
                        unreadMessages: "bla",
                        password: "bla"
                    }
                });
                runController();

                expect(scope.model.menuItems.length).toBe(3);
                expect(menuItemsContains(scope.model.menuItems, "#/perform_measurements")).toBeTruthy();
                expect(menuItemsContains(scope.model.menuItems, "#/messages")).toBeTruthy();
                expect(menuItemsContains(scope.model.menuItems, "#/change_password")).toBeTruthy();
            });

            var menuItemsContains = function(menuItems, url) {
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].url === url) {
                        return true;
                    }
                }

                return false;
            };
        });
    });
}());
