(function() {
    'use strict';

    describe('opentele.stateServices.headerServices module', function() {

        beforeEach(module('opentele.stateServices.headerServices'));

        describe('header service', function() {
            var headerService;

            beforeEach(inject(function(_headerService_) {
                headerService = _headerService_;
            }));

            // header enabled

            it('header enabled should default to true', function() {
                expect(headerService.getHeader()).toEqual(true);
            });

            it('header enabled should change to false', function() {
                headerService.setHeader(false);
                expect(headerService.getHeader()).toEqual(false);
            });

            // main menu

            it('main menu should default to true', function() {
                expect(headerService.getMainMenu()).toEqual(true);
            });

            it('main menu should change to false', function() {
                headerService.setMainMenu(false);
                expect(headerService.getMainMenu()).toEqual(false);
            });

            // back

            it('back should default to false', function() {
                expect(headerService.getBack()).toEqual(false);
            });

            it('back should change to true', function() {
                headerService.setBack(true);
                expect(headerService.getBack()).toEqual(true);
            });


        });
    });
}());