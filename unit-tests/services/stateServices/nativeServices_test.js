(function() {
    'use strict';

    describe('opentele.stateServices.nativeServices module', function() {
        var window, nativeService, passedArgument;

        beforeEach(module(function($provide) {
            var native = {
                getDeviceInformation: function() {
                    return '{"model":"Nexus 7",' +
                        '"androidVersion":"4.3",' +
                        '"bluetooth":"N\/A",' +
                        '"wifi":"true",' +
                        '"totalMemory":"1911332864",' +
                        '"availableMemory":"1092673536",' +
                        '"brand":"google",' +
                        '"serial":"091ce000"}';
                },
                sendReminders: function(json) {
                    passedArgument = json;
                },
                clearRemindersForQuestionnaire: function(questionnaireName) {
                    passedArgument = questionnaireName;
                },
                getQuestionnairesToHighlight: function() {
                    return "[\"Blodsukker (manuel)\", \"Proteinindhold i urin\"]";
                }
            };
            window = {
                Native: native
            };
            $provide.value('$window', window);

        }));

        beforeEach(module('opentele.stateServices.nativeServices'));

        beforeEach(inject(function(_nativeService_) {
            nativeService = _nativeService_;
        }));

        it('should return a JSON representation of device information', function() {
            var deviceInformation = nativeService.getDeviceInformation();
            expect(deviceInformation.model).toEqual("Nexus 7");
            expect(deviceInformation.androidVersion).toEqual("4.3");
            expect(deviceInformation.bluetooth).toEqual("N/A");
            expect(deviceInformation.wifi).toEqual("true");
            expect(deviceInformation.totalMemory).toEqual("1911332864");
            expect(deviceInformation.availableMemory).toEqual("1092673536");
            expect(deviceInformation.brand).toEqual("google");
            expect(deviceInformation.serial).toEqual("091ce000");
        });

        it('should send properly parsed reminders', function() {
            passedArgument = "";
            nativeService.sendReminders(["Blodtryk","Saturation"]);
            expect(passedArgument).toEqual('["Blodtryk","Saturation"]');
        });

        it('should send questionnaire name as expected', function() {
            passedArgument = "";
            nativeService.clearRemindersForQuestionnaire("Blodtryk");
            expect(passedArgument).toEqual("Blodtryk");
        });

        it('should return a JSON representation of questionnaires to highlight', function() {
            var questionnairesToHighlight = nativeService.getQuestionnairesToHighlight();
            expect(questionnairesToHighlight.length).toEqual(2);
            expect(questionnairesToHighlight[0]).toEqual("Blodsukker (manuel)");
            expect(questionnairesToHighlight[1]).toEqual("Proteinindhold i urin");
        });

        it('should correctly parse an empty questionnaires to highlight response', function() {
            window.Native.getQuestionnairesToHighlight = function() { return '[]'; };
            var questionnairesToHighlight = nativeService.getQuestionnairesToHighlight();
            expect(questionnairesToHighlight.length).toEqual(0);
        });

    });

}());
