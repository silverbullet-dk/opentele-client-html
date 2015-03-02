(function() {
    "use strict";

    module.exports = function (config) {

        config.set({

            basePath: './',

            files: [
                'app/bower_components/moment/moment.js',
                'app/bower_components/moment/locale/da.js',

                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-base64/angular-base64.js',
                'app/bower_components/angular-loader/angular-loader.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/bower_components/angular-moment/angular-moment.js',
                'app/bower_components/angular-resource/angular-resource.js',
                'app/bower_components/angular-route/angular-route.js',
                'app/bower_components/angular-sanitize/angular-sanitize.js',
                'app/bower_components/angular-translate/angular-translate.js',

                'app/areas/**/*.js',
                'app/directives/**/*.js',
                'app/services/**/*.js',
                'app/translations/**/*.js',

                'app/tmp/*.js',
                'app/config.js',
                'app/app.js',

                'unit-tests/**/*.js'
            ],

            autoWatch: true,

            frameworks: ['jasmine'],

            plugins: [
                'karma-phantomjs-launcher',
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-coverage',
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-threshold-reporter'
            ],

            reporters: ['progress', 'junit'],

            junitReporter: {
                outputFile: 'test_out/unit.xml',
                suite: 'unit'
            },

            coverageReporter: {
                type: 'html',
                dir: 'test_out/'
            },

            thresholdReporter: {
                statements: 80,
                branches: 60,
                functions: 85,
                lines: 80
            }

        });
    };
}());
