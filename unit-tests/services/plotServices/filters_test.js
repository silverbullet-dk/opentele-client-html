(function() {
    'use strict';

    describe('opentele.plotServices.filters module', function() {

        beforeEach(module('opentele.plotServices.filters'));

        describe('filters', function() {
            var filters;

            beforeEach(inject(function(_filters_) {
                filters = _filters_;
            }));

            it('should have the expected constants defined', function() {
                expect(filters.WEEK).toEqual('WEEK');
                expect(filters.MONTH).toEqual('MONTH');
                expect(filters.QUARTER).toEqual('QUARTER');
                expect(filters.YEAR).toEqual('YEAR');
                expect(filters.ALL).toEqual('ALL');
            });

            it('should set filters on model as expected', function() {
                var model = {};
                filters.render(model);
                expect(model.filters.length).toEqual(5);

                expect(model.filters[0].label).toEqual('SHOW_1_WEEK');
                expect(model.filters[0].filter).toEqual('WEEK');

                expect(model.filters[1].label).toEqual('SHOW_1_MONTH');
                expect(model.filters[1].filter).toEqual('MONTH');

                expect(model.filters[2].label).toEqual('SHOW_3_MONTHS');
                expect(model.filters[2].filter).toEqual('QUARTER');

                expect(model.filters[3].label).toEqual('SHOW_1_YEAR');
                expect(model.filters[3].filter).toEqual('YEAR');

                expect(model.filters[4].label).toEqual('SHOW_ALL');
                expect(model.filters[4].filter).toEqual('ALL');
            });

        });
    });
}());