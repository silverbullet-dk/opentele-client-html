(function() {
    'use strict';

    describe('acknowledgements', function() {
        var loginPage = require("../login/loginPage.js");
        var menuPage = require("../menu/menuPage.js");
        var acknowledgementsPage = require("./acknowledgementsPage.js");

        describe('when authenticated', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('nancyann', 'abcd1234');
                menuPage.toAcknowledgements();
            });

            it('should navigate to acknowledgements page', function() {
                expect(browser.getLocationAbsUrl()).toMatch("/acknowledgements");
                expect(acknowledgementsPage.title.getText()).toEqual('Acknowledgements');
                expect(acknowledgementsPage.acknowledgementList).toBeDefined();
            });

            it('should show list of acknowledgements', function() {
                acknowledgementsPage.acknowledgementMessages.then(function(messages) {
                    expect(messages.length).toEqual(4);
                    expect(messages[0].getText()).toMatch(/Blodsukker/);
                    expect(messages[0].getText()).toMatch(/05-04-2011/);
                    expect(messages[0].getText()).toMatch(/08:23/);
                    expect(messages[0].getText()).toMatch(/07-10-2012/);
                    expect(messages[0].getText()).toMatch(/18:13/);

                    expect(messages[1].getText()).toMatch(/Blodsukker/);
                    expect(messages[1].getText()).toMatch(/28-02-2013/);
                    expect(messages[1].getText()).toMatch(/15:10/);
                    expect(messages[1].getText()).toMatch(/08-09-2014/);
                    expect(messages[1].getText()).toMatch(/16:39/);

                    expect(messages[2].getText()).toMatch(/Hæmoglobin/);
                    expect(messages[2].getText()).toMatch(/13-10-2012/);
                    expect(messages[2].getText()).toMatch(/10:26/);
                    expect(messages[2].getText()).toMatch(/15-10-2013/);
                    expect(messages[2].getText()).toMatch(/12:54/);

                    expect(messages[3].getText()).toMatch(/Hæmoglobin/);
                    expect(messages[3].getText()).toMatch(/06-05-2011/);
                    expect(messages[3].getText()).toMatch(/13:37/);
                    expect(messages[3].getText()).toMatch(/23-11-2014/);
                    expect(messages[3].getText()).toMatch(/17:21/);

                });
            });

        });

        describe('when authenticated with no acknowledgements', function() {

            beforeEach(function() {
                loginPage.get();
                loginPage.doLogin('noAcknowledgements', '1234');
            });

            it('should see no acknowledgements page', function() {
                menuPage.menuItems.then(function(names) {
                    expect(names.indexOf('Acknowledgements')).toEqual(-1);
                });
            });

        });

    });
}());