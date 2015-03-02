(function() {
    'use strict';

    describe('opentele.plotServices.generate.ticks module', function () {

        beforeEach(module('opentele.plotServices.generate.ticks'));

        describe('ticks', function () {
            var ticks;

            beforeEach(inject(function (_ticks_) {
                ticks = _ticks_;
            }));

            describe('xStandardDay', function() {

                it('should generate expected number of standard day ticks', function() {
                    var resultTicks = ticks.xStandardDay();

                    expect(resultTicks.length).toEqual(25);
                    expect(resultTicks[0]).toEqual(new Date('1970-01-02T00:00:00+01:00'));
                    expect(resultTicks[3]).toEqual(new Date('1970-01-02T03:00:00+01:00'));
                    expect(resultTicks[11]).toEqual(new Date('1970-01-02T11:00:00+01:00'));
                    expect(resultTicks[18]).toEqual(new Date('1970-01-02T18:00:00+01:00'));
                    expect(resultTicks[23]).toEqual(new Date('1970-01-02T23:00:00+01:00'));
                    expect(resultTicks[24]).toEqual(new Date('1970-01-02T23:59:00+01:00'));
                });

            });

            describe('x', function() {

                it('should make day ticks for week', function() {
                    var now = new Date('2014-11-19T14:00:00+02:00');
                    var filter = 'WEEK';
                    var resultTicks = ticks.x(now, filter);
                    expect(resultTicks.length).toEqual(9);
                    expect(resultTicks[0]).toEqual(new Date('2014-11-12T14:00:00+02:00'));
                    expect(resultTicks[3]).toEqual(new Date('2014-11-15T14:00:00+02:00'));
                    expect(resultTicks[7]).toEqual(new Date('2014-11-19T14:00:00+02:00'));
                    expect(resultTicks[8]).toEqual(new Date('2014-11-20T14:00:00+02:00'));
                });

                it('should make day ticks for month', function() {
                    var now = new Date('2014-11-19T01:00:00+02:00');
                    var filter = 'MONTH';
                    var resultTicks = ticks.x(now, filter);
                    expect(resultTicks.length).toEqual(33);
                    expect(resultTicks[0]).toEqual(new Date('2014-10-19T00:00:00+02:00'));
                    expect(resultTicks[1]).toEqual(new Date('2014-10-20T00:00:00+02:00'));
                    expect(resultTicks[8]).toEqual(new Date('2014-10-27T01:00:00+02:00'));
                    expect(resultTicks[19]).toEqual(new Date('2014-11-07T01:00:00+02:00'));
                    expect(resultTicks[31]).toEqual(new Date('2014-11-19T01:00:00+02:00'));
                    expect(resultTicks[32]).toEqual(new Date('2014-11-20T01:00:00+02:00'));
                });

                it('should make day ticks for quarter', function() {
                    var now = new Date('2014-11-19T23:59:00+02:00');
                    var filter = 'QUARTER';
                    var resultTicks = ticks.x(now, filter);
                    expect(resultTicks.length).toEqual(20);
                    expect(resultTicks[0]).toEqual(new Date('2014-08-19T22:59:00+02:00'));
                    expect(resultTicks[1]).toEqual(new Date('2014-08-24T22:59:00+02:00'));
                    expect(resultTicks[5]).toEqual(new Date('2014-09-13T22:59:00+02:00'));
                    expect(resultTicks[12]).toEqual(new Date('2014-10-18T22:59:00+02:00'));
                    expect(resultTicks[18]).toEqual(new Date('2014-11-17T23:59:00+02:00'));
                    expect(resultTicks[19]).toEqual(new Date('2014-11-20T23:59:00+02:00'));
                });

                it('should make day ticks for year', function() {
                    var now = new Date('2014-11-19T15:00:00+02:00');
                    var filter = 'YEAR';
                    var resultTicks = ticks.x(now, filter);
                    expect(resultTicks.length).toEqual(21);
                    expect(resultTicks[0]).toEqual(new Date('2013-11-18T15:00:00+02:00'));
                    expect(resultTicks[1]).toEqual(new Date('2013-12-07T15:00:00+02:00'));
                    expect(resultTicks[5]).toEqual(new Date('2014-02-21T15:00:00+02:00'));
                    expect(resultTicks[8]).toEqual(new Date('2014-04-19T14:00:00+02:00'));
                    expect(resultTicks[12]).toEqual(new Date('2014-07-04T14:00:00+02:00'));
                    expect(resultTicks[18]).toEqual(new Date('2014-10-26T14:00:00+01:00'));
                    expect(resultTicks[19]).toEqual(new Date('2014-11-14T15:00:00+02:00'));
                    expect(resultTicks[20]).toEqual(new Date('2014-11-20T15:00:00+02:00'));
                });

                it('should make day ticks for all', function() {
                    var now = new Date('2014-11-19T15:00:00+01:00');
                    var filter = 'ALL';
                    var resultTicks = ticks.x(now, filter);
                    expect(resultTicks).toEqual([]); // jqplot does a fine job by default.
                });

            });

            describe('y', function() {

                it('should generate correct ranges for blood pressure', function() {
                    var resultTicks = ticks.y(50, 160, 'blood_pressure');
                    expect(resultTicks.length).toEqual(9);
                    expect(resultTicks[0]).toEqual(40);
                    expect(resultTicks[8]).toEqual(200);

                    resultTicks = ticks.y(50, 232, 'blood_pressure');
                    expect(resultTicks.length).toEqual(11);
                    expect(resultTicks[0]).toEqual(40);
                    expect(resultTicks[10]).toEqual(240);

                    resultTicks = ticks.y(20, 160, 'blood_pressure');
                    expect(resultTicks.length).toEqual(10);
                    expect(resultTicks[0]).toEqual(20);
                    expect(resultTicks[9]).toEqual(200);
                });

                it('should generate correct ranges for crp', function() {
                    var resultTicks = ticks.y(3, 760, 'crp');
                    expect(resultTicks.length).toEqual(11);
                    expect(resultTicks[0]).toEqual(0);
                    expect(resultTicks[1]).toEqual(100);
                    expect(resultTicks[3]).toEqual(300);
                    expect(resultTicks[9]).toEqual(900);
                    expect(resultTicks[10]).toEqual(1000);
                });

                it('should generate correct ranges for blood sugar', function() {
                    var resultTicks = ticks.y(2.1, 14.7, 'bloodsugar');
                    expect(resultTicks.length).toEqual(9);
                    expect(resultTicks[0]).toEqual(1);
                    expect(resultTicks[1]).toEqual(3);
                    expect(resultTicks[4]).toEqual(9);
                    expect(resultTicks[7]).toEqual(15);
                    expect(resultTicks[8]).toEqual(17);
                });

            });

        });
    });
}());
