(function() {
    'use strict';

    var utils = require("./utils.js");

    var validUsers = {
        "nancyann:abcd1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "rene:1234": {
            firstName: "René",
            lastName: "Andersen",
            passwordExpired: false
        },
        "measurements401:1234": {
            firstName: "Will get 401",
            lastName: "error",
            passwordExpired: false
        },
        "measurements500:1234": {
            firstName: "Will get 500",
            lastName: "error",
            passwordExpired: false
        },
        "messagesNoRecipients:1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "messagesNoMessages:1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "messagesNoNewMessage:1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "noAcknowledgements:1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "uploadfails:1234": {
            firstName: "Fails",
            lastName: "Twice",
            passwordExpired: false
        },
        "changepw:1234": {
            firstName: "Nancy Ann",
            lastName: "Berggren",
            passwordExpired: false
        },
        "changepwfails:1234": {
            firstName: "Change PW",
            lastName: "Fails",
            passwordExpired: false
        },
        "mustchangepw:1234": {
            firstName: "Must Change",
            lastName: "Password",
            passwordExpired: true
        }
    };

    var usersNoMessageLinks = ["noAcknowledgements:1234", "messagesNoRecipients:1234", ""];

    exports.get = function (req, res, baseUrl) {
        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Login received for: " + userToken);

        if (userToken in validUsers) {
            console.log("User token valid. Login accepted.");
            var user = validUsers[userToken];
            user = addLinks(user, baseUrl, (usersNoMessageLinks.indexOf(userToken) > -1) === false);
            res.send(user);
            return true;
        }

        if (userToken.indexOf('locked') > -1) {
            console.log('User is locked. Login rejected.');
            res.setHeader('Access-Control-Expose-Headers', 'AccountIsLocked');
            res.setHeader('AccountIsLocked', 'true');
            res.status(401).send();
            return false;
        }

        console.log("User token not valid. Login rejected.");
        res.status(401).end();
        return false;
    };

    var addLinks = function(user, baseUrl, shouldAddMessageLinks) {
        user.links = {};
        user.links.self = baseUrl + "patient";
        user.links.password = baseUrl + "rest/password/update";
        user.links.measurements = baseUrl + "patient/measurements";
        user.links.questionnaires = baseUrl + "rest/questionnaire/listing";
        user.links.reminders = baseUrl + "rest/reminder/next";
        if (shouldAddMessageLinks) {
            user.links.messageThreads = baseUrl + "rest/message/recipients";
            user.links.unreadMessages = baseUrl + "rest/message/list";
            user.links.acknowledgements = baseUrl + "rest/questionnaire/acknowledgements";
        }

        return user;
    };

    exports.changePassword = function(req, res) {
        console.log(req.body);
        var userToken = utils.decodeAuthorizationHeader(req);
        if (userToken.indexOf('changepwfails') > -1) {
            setTimeout(function() {
                res.send({
                    status: 'error',
                    errors: [
                        {
                            error: 'password too short',
                            field: 'password'
                        },
                        {
                            error: 'must contain one digit',
                            field: 'password'
                        }
                    ]
                }).end();
            }, 200);

            return;
        }

        var newUserToken = userToken.split(':')[0] + ':' + JSON.parse(req.body).password;
        validUsers[newUserToken] = {
            id: 1,
            firstName: "Nancy Ann",
            lastName: "Berggren",
            showRealtimeCTG: false
        };

        setTimeout(function() {
            res.status(200).send({status: 'ok'});
        }, 500);
    };
}());
