exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'areas/**/*.js'
    ],

    baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    onPrepare: function() {
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.caps_.browserName;
        });
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('xmloutput', true, true, '../test_out/e2e.xml'));
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
