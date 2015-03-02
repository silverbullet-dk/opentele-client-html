(function() {
    'use strict';

    describe('index', function() {
        it('should automatically redirect to /login when location hash/fragment is empty', function() {
            browser.get('index.html');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
        });
    });
}());
