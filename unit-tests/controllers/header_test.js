(function () {
    'use strict';
    describe('opentele.controllers.header', function () {

        beforeEach(module('opentele.controllers.header'));

        describe('HeaderCtrl tests', function () {
            var runController, scope, location;

            beforeEach(inject(function ($controller, $rootScope, $location) {
                runController = function () {
                    $controller('HeaderCtrl', {
                        $scope: scope,
                        $location: location
                    });
                };
                scope = $rootScope.$new();
                location = $location;
            }));

            it('should redirect to login page', function () {
                runController();

                scope.goLogout();

                expect(location.path()).toBe('/login');
            });
        });
    });
}());
