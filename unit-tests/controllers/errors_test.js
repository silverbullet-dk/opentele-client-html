(function() {
    'use strict';

    describe('errors controller tests', function() {
        var scope, location, runController, appContext,
            restConfig, appConfig, logReporting;

        beforeEach(module('opentele.controllers.errors'));
        beforeEach(module('opentele.stateServices'));

        beforeEach(function() {

            // logReporting
            logReporting = {
                log: function(exception) {
                    expect(exception.stack).toEqual('STACK TRACE!');
                    expect(exception.message).toEqual('An error occurred!');
                }
            };

            module(function($provide) {
                $provide.value('logReporting', logReporting);
            });
        });

        beforeEach(inject(function($rootScope, $location, $controller,
                                   _appConfig_, _appContext_) {

            scope = $rootScope.$new();
            location = $location;
            appContext = _appContext_;
            appContext.requestParams.set('exception', {
                stack: 'STACK TRACE!',
                message: 'An error occurred!'
            });
            appConfig = _appConfig_;
            appConfig.loggingEnabled = true;

            runController = function() {
                $controller('ErrorsCtrl', {
                    '$scope': scope,
                    '$location': location,
                    'appConfig': appConfig,
                    'appContext': appContext,
                    'logReporting': logReporting
                });
            };
        }));

        it('should set error text', function() {
            runController();
            expect(scope.model.description).toMatch(/DOWN/);
        });

        it('should redirect to login', function() {
            runController();
            scope.leaveErrorPage();
            expect(location.path()).toBe('/menu');
        });

        it('should pass exception on to logReporting', function() {
            expect(appContext.requestParams.containsKey('exception')).toBe(true);
            var exception = appContext.requestParams.get('exception');
            expect(exception.stack).toEqual('STACK TRACE!');
            expect(exception.message).toEqual('An error occurred!');
            runController();
            expect(appContext.requestParams.containsKey('exception')).toBe(false);
        });

    });
}());
