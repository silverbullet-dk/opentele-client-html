(function() {
    'use strict';

    describe('opentele.translations', function() {

        beforeEach(module('opentele.translations'));

        it('should have same number for entries in both language dictionaries',
            inject(function(_enUsTranslations_, _daDkTranslations_) {
                var dkDict, enDict, hasSameKeys, key;

                dkDict = _daDkTranslations_;
                enDict = _enUsTranslations_;
                hasSameKeys = true;

                for (key in enDict) {
                    if (!(enDict.hasOwnProperty(key) && dkDict.hasOwnProperty(key))) {
                        hasSameKeys = false;
                        break;
                    }
                }

                expect(hasSameKeys).toBe(true);
            }));

        it('should return "Forkert brugernavn eller kodeord" when using da-DK dict',
            inject(function($translate) {
                $translate.use('da-DK');
                var errorMessage = $translate.instant("BAD_CREDENTIALS");
                expect(errorMessage).toBe("Forkert brugernavn eller kodeord");
            }));

        it('should return "Wrong username or password" when using en-US dict',
            inject(function($translate) {
                $translate.use('en-US');
                var errorMessage = $translate.instant("BAD_CREDENTIALS");
                expect(errorMessage).toBe("Wrong username or password");
            }));

        it('should default to en-US dictionary when using unknown language',
            inject(function($translate) {
                var changePasswordText = $translate.instant("MENU_CHANGE_PASSWORD");
                expect(changePasswordText).toBe("Change password");
            }));

    });
}());
