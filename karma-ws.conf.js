(function() {
    "use strict";

    module.exports = function (config) {

        config.set({

            basePath: './',

            files: [
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-route/angular-route.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/bower_components/angular-base64/angular-base64.js',
                'app/bower_components/angular-sanitize/angular-sanitize.js',
                'app/bower_components/angular-resource/angular-resource.js',
                'app/bower_components/angular-translate/angular-translate.js',

                'app/dist/app.js',
                'unit-tests/**/*.js'
            ],

            port: 9880,

            autoWatch: false,

            singleRun: true,

            browsers: ['Chrome'],

            frameworks: ['jasmine'],

            plugins: [
                'karma-phantomjs-launcher',
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-jasmine',
                'karma-junit-reporter'
            ],

            reporters: ['progress', 'junit'],

            junitReporter: {
                outputFile: 'test_out/unit.xml',
                suite: 'unit'
            }

        });
    };
}());
