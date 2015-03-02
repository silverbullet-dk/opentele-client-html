(function() {
    'use strict';

    var utils = require("./utils.js");

    // API

    exports.list = function (req, res) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Reminders list requested from: " + userToken);

        if (userToken.indexOf("noReminders") > -1) {
            console.log("Empty reminders list returned.");
            res.send([]);
            return;
        }

        console.log("Reminders returned.");
        res.send(reminders);
    };

    // Data

    var reminders = [
        {
            "questionnaireId": 13,
            "questionnaireName": "Blodtryk og puls",
            "alarms": [82650, 83550]
        },
        {
            "questionnaireId": 19,
            "questionnaireName": "JSON test",
            "alarms": [161850, 162750]
        },
        {
            "questionnaireId": 21,
            "questionnaireName": "Proteinindhold i urin",
            "alarms": [82650, 83550]
        }
    ];

}());
