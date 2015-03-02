(function() {
    'use strict';

    describe('opentele.stateServices.statePassingServices module', function() {

        beforeEach(module('opentele.stateServices.statePassingServices'));

        describe('current user service', function() {
            var appContext;

            beforeEach(inject(function(_appContext_) {
                appContext = _appContext_;
            }));

            it('should default to undefined user', function() {
                expect(appContext.currentUser.get()).toEqual({});
            });

            it('should change current user', function() {
                appContext.currentUser.set({
                    name: "some name"
                });

                expect(appContext.currentUser.get()).toEqual({
                    name: "some name"
                });
            });

            it('should be possible to clear current user', function() {
                appContext.currentUser.set({
                    name: "some name"
                });

                appContext.currentUser.clear();

                expect(appContext.currentUser.get()).toEqual({});
            });

            it('should be possible to ask if valid current user is set', function() {
                appContext.currentUser.set({});
                expect(appContext.currentUser.isValid()).toBe(false);

                appContext.currentUser.set({
                    firstName: 'foo',
                    lastName: 'bar'
                });

                expect(appContext.currentUser.isValid()).toBe(true);
            });
        });

        describe('request parameters service', function() {
            var requestParams;

            beforeEach(inject(function(_appContext_) {
                requestParams = _appContext_.requestParams;
            }));

            it('should be able to set and get parameter', function() {
                requestParams.set('some_key', 'some_value');

                expect(requestParams.getAndClear('some_key')).toBe('some_value');
            });

            it('should throw exception if key does not exist', function() {
                expect(function() {
                    requestParams.getAndClear('does not exit');
                }).toThrow();
            });

            it('should clear parameter after it has been requested', function() {
                requestParams.set('foo', 'bar');

                expect(requestParams.getAndClear('foo')).toBe('bar');
                expect(function() {
                    requestParams.getAndClear('foo');
                }).toThrow();
            });

            it('should be able to check if key exist', function() {
                requestParams.set('someKey', 'value');

                expect(requestParams.containsKey('someKey')).toBe(true);
                expect(requestParams.containsKey('someOtherKey')).toBe(false);
            });
        });
    });
}());
