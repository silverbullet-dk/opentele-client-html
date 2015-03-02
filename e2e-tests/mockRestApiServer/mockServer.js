var express = require('express');
var cors = require('cors');
var login = require('./loginHandler.js');
var questionnaires = require('./questionnairesHandler.js');
var messages = require('./messagesHandler.js');
var acknowledgements = require('./acknowledgementsHandler.js');
var reminders = require('./remindersHandler.js');
var measurements = require('./measurementsHandler.js');

var requestLogger = function(req, res, next) {
    console.log("Got request: " + req.method + ' ' + req.url);
    next();
};

var authorizationHeaderCheck = function(req, res, next) {
    var suffix = '/opentele-citizen-server/';
    if (req.url.indexOf(suffix, req.url.length - suffix.length) !== -1) {
        next();
        return;
    }

    if (!('authorization' in req.headers)) {
        console.log("No authorization header. Request rejected.");
        res.status(401).send();
        return;
    }

    next();
};

var bodyParser = function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
};

var app = express();
app.use(cors());
app.use(requestLogger);
app.use(authorizationHeaderCheck);
app.use(bodyParser);

app.get('/opentele-citizen-server', function(req, res) {
    console.log('Request for server information received');
    res.send({
        version: "1.0.0",
        serverEnvironment: "development",
        links: {'patient': baseUrl + 'patient'}
    });
});

app.get('/opentele-citizen-server/patient', function(req, res) {
    login.get(req, res, baseUrl);
});

app.post('/opentele-citizen-server/rest/password/update', function(req, res) {
    login.changePassword(req, res);
});

app.get('/opentele-citizen-server/rest/questionnaire/listing', function(req, res) {
    questionnaires.list(req, res);
});

app.get('/opentele-citizen-server/rest/questionnaire/download/:id', function(req, res) {
    console.log(req.params);
    questionnaires.get(req, res);
});

app.get('/opentele-citizen-server/rest/message/recipients', function(req, res) {
    messages.recipients(req, res);
});

app.get('/opentele-citizen-server/rest/message/list', function(req, res) {
    messages.list(req, res);
});

app.get('/opentele-citizen-server/rest/questionnaire/acknowledgements', function(req, res) {
    acknowledgements.list(req, res);
});

app.get('/opentele-citizen-server/rest/reminder/next', function(req, res) {
    reminders.list(req, res);
});

app.get('/opentele-citizen-server/patient/measurements', function(req, res) {
    measurements.list(req, res, baseUrl);
});

app.get('/opentele-citizen-server/patient/measurements/:id', function(req, res) {
    console.log(req.params);
    console.log(req.query);
    measurements.get(req, res);
});

app.post('/opentele-citizen-server/rest/questionnaire/listing', function(req, res) {
    console.log('Received POST. Logging request body:');
    console.log(req.body);
    questionnaires.upload(req, res);
});

app.post('/opentele-citizen-server/rest/message/list', function(req, res) {
    messages.upload(req, res);
});

app.post('/opentele-citizen-server/rest/message/markAsRead', function(req, res) {
    messages.markAsRead(req, res);
});

app.get('/opentele-citizen-server/currentVersion', function(req, res) {
    console.log('This URL is deprecated... Use / instead');
    res.status(404).end();
});

app.get('/opentele-citizen-server/rest/patient/login', function(req, res) {
    console.log('This URL is deprecated... Use /patient instead');
    res.status(404).end();
});

app.get('/*', function(req, res) {
    console.log('Unsupported request from: ' + req.method + " " + req.url);
    res.status(404).end();
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});

var baseUrl = 'http://localhost:' + server.address().port + '/opentele-citizen-server/';
console.log("Citizen mock server baseUrl: " + baseUrl);
