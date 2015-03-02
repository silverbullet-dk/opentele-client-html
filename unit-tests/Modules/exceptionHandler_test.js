(function() {
    'use strict';

    describe('exceptions should be delegated to opentele.exceptionHandler', function() {
        function TestCtrlThrowing($exceptionHandler) {
            // Trigger a reported error
            $exceptionHandler({ stack: 'This is a stack trace!', message: "Some Random Error"});
        }

        beforeEach(module('opentele.exceptionHandler'));
        beforeEach(module('opentele.stateServices'));

        beforeEach(module(function($exceptionHandlerProvider) {
            $exceptionHandlerProvider.mode("log");
        }));

        it('should redirect to error page on unhandled exceptions', inject(function($controller, $location, _appContext_) {
            var appContext = _appContext_;
            $controller(TestCtrlThrowing);
            expect(appContext.requestParams.containsKey('exception'));
            var exception = appContext.requestParams.get('exception');
            expect(exception.stack).toEqual('This is a stack trace!');
            expect(exception.message).toEqual('Some Random Error');
            expect($location.path()).toBe('/error');
        }));
        
    });
}());
