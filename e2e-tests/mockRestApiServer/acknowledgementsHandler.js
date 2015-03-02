(function() {
    'use strict';

    var utils = require("./utils.js");

    // API

    exports.list = function (req, res) {

        var userToken = utils.decodeAuthorizationHeader(req);
        console.log("Acknowledgements list requested from: " + userToken);

        if (userToken.indexOf("noAcknowledgements") > -1) {
            console.log("Empty acknowledgements list returned.");
            res.send({acknowledgements : []});
            return;
        }

        console.log("Acknowledgements returned.");
        res.send(acknowledgements);
    };

    // Data

    var acknowledgements = {
        "acknowledgements": [
            {
                "id": 205,
                "message": "Dine data fra spørgeskemaet Hæmoglobin indhold i blod " +
                    "indsendt d. 06-05-2011 kl. 13:37 er set og godkendt d. " +
                    "23-11-2014 kl. 17:21."
            },
            {
                "id": 203,
                "message": "Dine data fra spørgeskemaet Hæmoglobin indhold i blod " +
                    "indsendt d. 13-10-2012 kl. 10:26 er set og godkendt d. " +
                    "15-10-2013 kl. 12:54."
            },
            {
                "id": 201,
                "message": "Dine data fra spørgeskemaet Blodsukker indsendt d. " +
                    "28-02-2013 kl. 15:10 er set og godkendt d. 08-09-2014 kl." +
                    " 16:39."
            },
            {
                "id": 198,
                "message": "Dine data fra spørgeskemaet Blodsukker indsendt d. " +
                    "05-04-2011 kl. 08:23 er set og godkendt d. 07-10-2012 kl. " +
                    "18:13."
            }
        ]
    };

}());