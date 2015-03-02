(function() {
    'use strict';

    var utils = require("./utils.js");

    exports.recipients = function(req, res) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Recipient list requested from: " + userToken);

        if (userToken.indexOf("messagesNoRecipients") > -1) {
            res.send([]);
            console.log("Empty recipients list returned");
            return;
        }
        if (userToken.indexOf("rene") > -1) {
            res.send([
                {
                    "id": 6,
                    "name": "Obstetrisk Y, AUH, RM"
                }
            ]);
            return;
        }

        console.log("Recipients returned.");
        res.send(recipientsList);
    };

    exports.list = function(req, res) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Messages list requested from: " + userToken);

        if (userToken.indexOf("messagesNoMessages") > -1) {
            console.log("Empty messages list returned.");
            res.send({unread: 0, messages: []});
            return;
        }

        console.log("Messages returned.");
        res.send(messageList);
    };

    exports.upload = function(req, res) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Messages POST requested from: " + userToken);

        if (userToken.indexOf("messagesNoNewMessage") > -1) {
            console.log("Can't send new message.");
            res.status(500).end();
            return;
        }

        console.log("New message successfully send.");
        res.status(200).end();
    };

    exports.markAsRead = function(req, res) {
        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Messages markAsRead requested from: " + userToken);

        if (userToken.indexOf("messagesNoNewMessage") > -1) {
            console.log("Can't mark messages as read.");
            res.status(500).end();
            return;
        }

        console.log("Messages successfully marked as read.");
        res.status(200).end();
    };

    var recipientsList = [
        {
            "id": 6,
            "name": "Obstetrisk Y, AUH, RM"
        },
        {
            "id": 8,
            "name": "TCN"
        },
        {
            "id": 1,
            "name": "Afdeling-B Test"
        }
    ];

    var messageList = {
        unread: 3,
        messages: [
            {
                "id": 252,
                "text": "Test",
                "to": {
                    "type": "Patient",
                    "id": 11,
                    "name": "Nancy Ann Berggren"
                },
                "from": {
                    "type": "Department",
                    "id": 1,
                    "name": "Afdeling-B Test"
                },
                "isRead": true,
                "sendDate": "2013-12-19T10:25:44.877+01:00",
                "readDate": "2014-01-22T11:40:00.690+01:00"
            },
            {
                "id": 251,
                "title": "",
                "text": "",
                "to": {
                    "type": "Patient",
                    "id": 11,
                    "name": "Nancy Ann Berggren"
                },
                "from": {
                    "type": "Department",
                    "id": 1,
                    "name": "Afdeling-B Test"
                },
                "isRead": false,
                "sendDate": "2013-12-17T10:58:27.283+01:00",
                "readDate": "2013-12-17T10:58:52.267+01:00"
            },
            {
                "id": 253,
                "title": "tredje besked",
                "text": "stadig test",
                "from": {
                    "type": "Patient",
                    "id": 11,
                    "name": "Nancy Ann Berggren"
                },
                "to": {
                    "type": "Department",
                    "id": 1,
                    "name": "Afdeling-B Test"
                },
                "isRead": true,
                "sendDate": "2013-12-21T10:58:27.283+01:00",
                "readDate": "2013-12-21T10:58:52.267+01:00"
            },
            {
                "id": 254,
                "title": "sidste besked",
                "text": "sidste test",
                "from": {
                    "type": "Patient",
                    "id": 11,
                    "name": "Nancy Ann Berggren"
                },
                "to": {
                    "type": "Department",
                    "id": 1,
                    "name": "Afdeling-B Test"
                },
                "isRead": false,
                "sendDate": "2013-12-24T10:58:27.283+01:00",
                "readDate": "2013-12-26T10:58:52.267+01:00"
            }
        ]
    };

}());