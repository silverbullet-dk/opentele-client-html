(function() {
    'use strict';

    var utils = require("./utils.js");

    exports.list = function(req, res) {
        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Questionnaire list requested from: " + userToken);
        if (userToken.indexOf("measurements401") > -1) {
            console.log("User no longer authenticated. Returning 401.");
            res.status(401).end();
            return;
        }
        if (userToken.indexOf("measurements500") > -1) {
            console.log("Simulation server error. Returning 500.");
            res.status(500).end();
            return;
        }
        if (userToken.indexOf("rene") > -1) {
            res.send({"questionnaires": [
                {
                    "id": 27,
                    "name": "Blodsukker (manuel)",
                    "schedule": null,
                    "version": "0.1"
            }]});
            return;
        }

        console.log("Questionnaires returned");
        res.send(questionnairesList);
    };

    exports.get = function(req, res) {
        var questionnaireId = req.params.id;
        console.log('Questionnaire id ' + questionnaireId);

        switch (questionnaireId) {
            case '12':
                res.send(require('./questionnaires/urineGlucoseManual.js').get);
                break;
            case '17':
                res.send(require('./questionnaires/urineManual.js').get);
                break;
            case '21':
                res.send(require('./questionnaires/temperatureManual.js').get);
                break;
            case '22':
                res.send(require('./questionnaires/haemoglobinManual.js').get);
                break;
            case '23':
                res.send(require('./questionnaires/crpManual.js').get);
                break;
            case '25':
                res.send(require('./questionnaires/radioButtonManual.js').get);
                break;
            case '28':
                res.send(require('./questionnaires/upDownManual.js').get);
                break;
            case '27':
                res.send(require('./questionnaires/bloodSugarManual.js').get);
                break;
            case '33':
                res.send(require('./questionnaires/saturationManual.js').get);
                break;
            case '102':
                res.send(require('./questionnaires/bloodPressureManual.js').get);
                break;
            case '29':
                res.send(require('./questionnaires/lungFunctionManual.js').get);
                break;
            default:
                res.status(404).end();
        }
    };

    var retryCount = 0;
    exports.upload = function(req, res) {
        var userToken = utils.decodeAuthorizationHeader(req);
        if (userToken.indexOf("uploadfails") > -1 && retryCount < 2) {
            retryCount += 1;
            res.status(500).end();
            return;
        }

        retryCount = 0;
        res.status(200).end();
    };

    var questionnairesList = {
    "questionnaires": [
        {
            "id": 27,
            "name": "Blodsukker (manuel)",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 33,
            "name": "Saturation (manuel)",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 22,
            "name": "Hæmoglobin indhold i blod",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 102,
            "name": "Blodtryk (manuel)",
            "schedule": null,
            "version": "2.0"
        },
        {
            "id": 21,
            "name": "Temperatur test",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 17,
            "name": "Proteinindhold i urin",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 12,
            "name": "Glukoseindhold i urin",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 26,
            "name": "Blodsukker",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 81,
            "name": "Blodtryk m/alarm",
            "schedule": null,
            "version": "1.0"
        },
        {
            "id": 9,
            "name": "Blodtryk og puls",
            "schedule": null,
            "version": "1.0"
        },
        {
            "id": 143,
            "name": "Blodtryk",
            "schedule": null,
            "version": "6.0"
        },
        {
            "id": 23,
            "name": "C-reaktivt Protein (CRP)",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 20,
            "name": "CTG m/tid",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 19,
            "name": "CTG",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 16,
            "name": "JaNej",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 15,
            "name": "JSON test",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 125,
            "name": "KOL-målinger",
            "schedule": null,
            "version": "6.0"
        },
        {
            "id": 14,
            "name": "Konsultation hos jordemoder eller læge",
            "schedule": null,
            "version": "1.0"
        },
        {
            "id": 82,
            "name": "Kontinuert glukosemåling (simuleret)",
            "schedule": null,
            "version": "1.0"
        },
        {
            "id": 29,
            "name": "Lungefunktion",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 25,
            "name": "Radioknap test",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 28,
            "name": "Rejse-sætte-sig test",
            "schedule": null,
            "version": "8.0"
        },
        {
            "id": 57,
            "name": "Saturation u/puls (manuel)",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 56,
            "name": "Saturation u/puls",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 32,
            "name": "Saturation",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 174,
            "name": "support_test_1",
            "schedule": null,
            "version": "1.0"
        },
        {
            "id": 31,
            "name": "Vejning (manuel)",
            "schedule": null,
            "version": "0.1"
        },
        {
            "id": 24,
            "name": "Vejning",
            "schedule": null,
            "version": "0.1"
        }
    ]};
}());
