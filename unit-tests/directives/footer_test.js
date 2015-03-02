(function() {
    'use strict';

    describe('opentele.directives.footer directive', function() {

        beforeEach(module('opentele.directives.footer'));

        describe('version directive', function() {
            it('should print current version', function() {
                module(function($provide) {
                    var appConfig = {
                        version: '1.27.0'
                    };
                    $provide.value('appConfig', appConfig);
                });
                inject(function($compile, $rootScope) {
                    var element = $compile('<span version></span>')($rootScope);
                    expect(element.text()).toEqual('1.27.0');
                });
            });
        });

        describe('server directive', function() {
            it('should print server url', function() {
                module(function($provide) {
                    var restConfig = {
                        baseUrl: 'http://localhost/'
                    };
                    $provide.value('restConfig', restConfig);
                });
                inject(function($compile, $rootScope) {
                    var element = $compile('<span server></span>')($rootScope);
                    expect(element.text()).toEqual('http://localhost/');
                });
            });
        });
    });

}());
