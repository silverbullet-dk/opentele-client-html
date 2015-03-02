(function () {
    "use strict";

    module.exports = function (grunt) {

        var appJsFiles = [
            'app/app.js',
            'app/config.js',
            'app/areas/**/*.js',
            'app/services/**/*.js',
            'app/directives/**/*.js',
            'app/translations/**/*.js'
        ];

        var allJsFiles = [
            'Gruntfile.js',
            'karma.conf.js',
            'e2e-tests/**/*.js',
            'unit-tests/**/*.js'
        ].concat(appJsFiles);

        var lessFiles = [
            'app/style/**/*.less'
        ];

        var libFiles = [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/moment/min/moment-with-locales.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-base64/angular-base64.js',
            'app/bower_components/angular-loader/angular-loader.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-moment/angular-moment.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-translate/angular-translate.js',

            'app/bower_components/jqplot/jquery.jqplot.js',
            'app/bower_components/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js',
            'app/bower_components/jqplot/plugins/jqplot.canvasAxisTickRenderer.js',
            'app/bower_components/jqplot/plugins/jqplot.canvasTextRenderer.js',
            'app/bower_components/jqplot/plugins/jqplot.canvasOverlay.js',
            'app/bower_components/jqplot/plugins/jqplot.dateAxisRenderer.js',
            'app/bower_components/jqplot/plugins/jqplot.cursor.js',
            'app/bower_components/jqplot/plugins/jqplot.highlighter.js'
        ];

        var libFilesMin = libFiles.map(function(filename) {
            return filename.slice(0,-3).concat('.min.js');
        });

        var htmlFiles = [
            'app/*.html',
            'app/directives/**/*.html',
            'app/areas/**/*.html',
            'app/services/parserServices/nodeTemplates/**/*.html'
        ];

        var env = grunt.option('env') || 'dev';
        var url = grunt.option('serverUrl');
        var config = {
            serverUrl: url,
            environment: env
        };

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            // Task configurations
            bower: {
                install: {
                    options: {
                        install: true,
                        copy: false,
                        targetDir: 'app/bower_components',
                        cleanTargetDir: false
                    }
                }
            },

            jshint: {
                all: allJsFiles
            },

            complexity: {
                generic: {
                    src: appJsFiles,
                    options: {
                        breakOnErrors: false,
                        jsLintXML: 'test_out/complexity-report.xml',
                        checkstyleXML: 'test_out/checkstyle.xml',
                        errorsOnly: false,
                        cyclomatic: [3,7,12],
                        halstead: [8,13,20],
                        maintainability: 100,
                        hideComplexFunctions: false,
                        broadcast: false
                    }
                }
            },

            buddyjs: {
                src: appJsFiles
            },

            karma: {
                options: {
                    configFile: 'karma.conf.js'
                },
                debug: {
                    browsers: ['Chrome'],
                    autoWatch: false,
                    singleRun: false
                },
                unit: {
                    browsers: ['Chrome'],
                    singleRun: true
                },
                ciUnit: {
                    browsers: ['PhantomJS'],
                    singleRun: true,
                    preprocessors: {
                        'app/app.js': ['coverage'],
                        'app/areas/**/*.js': ['coverage'],
                        'app/directives/**/*.js': [],
                        'app/services/**/*.js': ['coverage'],
                        'app/translations/**/*.js': ['coverage']
                    },
                    reporters: ['progress', 'junit', 'coverage', 'threshold']
                },
                continous: {
                    singleRun: false,
                    autoWatch: true
                }
            },

            html2js: {
                options: {
                    base: 'app'
                },
                dist: {
                    src: htmlFiles,
                    dest: 'app/tmp/templates.js'
                }
            },

            concat: {
                options: {
                    separator: '\n'
                },
                dev: {
                    files: {
                        'app/dist/app.js': appJsFiles.concat(['app/tmp/*.js']),
                        'app/dist/libs.js': libFiles
                    }
                },
                prod: {
                    files: {
                        'app/dist/app.js': appJsFiles.concat(['app/tmp/*.js']),
                        'app/dist/libs.js': libFilesMin
                    }
                }
            },

            less: {
                dev: {
                    files: {
                        "app/style.css": "app/style/style.less"
                    }
                },
                prod: {
                    options: {
                        cleancss: true
                    },
                    files: {
                        "app/style.css": "app/style/style.less"
                    }
                }
            },

            lesslint: {
                src: ['app/style/**/*.less']
            },

            ngAnnotate: {
                options: {
                    add: true
                },
                opentele: {
                    files: {
                        'app/dist/app.js': ['app/dist/app.js']
                    }
                }
            },

            uglify: {
                dist: {
                    files: {
                        'app/dist/app.js': ['app/dist/app.js']
                    },
                    options: {
                        mangle: false
                    }
                }
            },

            clean: {
                temp: {
                    src: ['app/tmp']
                },
                dist: {
                    src: ['dist/']
                }
            },

            watch: {
                dev: {
                    files: allJsFiles.concat(htmlFiles).concat(lessFiles),
                    tasks: ['jshint', 'less:dev', 'html2js:dist', 'karma:unit',
                        'concat:dev', 'ngAnnotate:opentele', 'clean:temp'],
                    options: {
                        atBegin: true
                    }
                },
                devCompile: {
                    files: allJsFiles.concat(htmlFiles).concat(lessFiles),
                    tasks: ['jshint', 'less:dev', 'html2js:dist', 'concat:dev',
                        'ngAnnotate:opentele', 'clean:temp'],
                    options: {
                        atBegin: true
                    }
                },
                devDocs: {
                    files: allJsFiles.concat(htmlFiles).concat(lessFiles),
                    tasks: ['jshint', 'less:dev', 'html2js:dist', 'ngdocs',
                        'concat:dev', 'ngAnnotate:opentele', 'clean:temp'],
                    options: {
                        atBegin: true
                    }
                },
                min: {
                    files: allJsFiles.concat(htmlFiles).concat(lessFiles),
                    tasks: ['jshint', 'less:prod', 'html2js:dist', 'karma:unit',
                        'concat:dev', 'ngAnnotate:opentele', 'clean:temp',
                        'uglify:dist'],
                    options: {
                        atBegin: true
                    }
                }
            },

            connect: {
                app: {
                    options: {
                        hostname: 'localhost',
                        port: 8000
                    }
                },
                appVisible: {
                    options: {
                        hostname: '*',
                        port: 8000
                    }
                },
                package: {
                    options: {
                        port: 8000,
                        hostname: 'localhost',
                        base: 'dist/package/'
                    }
                }
            },

            zip: {
                dist: {
                    cwd: 'dist/app/',
                    src: ['dist/app/dist/*', 'dist/app/images/*', 'dist/app/*'],
                    dest: 'dist/' + config.environment + '/<%= pkg.name %>.zip'
                }
            },

            unzip: {
                dist: {
                    src: 'dist/' + config.environment + '/<%= pkg.name %>.zip',
                    dest: 'dist/package/app/'
                }
            },

            war: {
                dist: {
                    options: {
                        war_dist_folder: 'dist/' + config.environment,
                        war_verbose: true,
                        war_name: '<%= pkg.name %>',
                        webxml_welcome: 'index.html',
                        webxml_display_name: 'OpenTele'
                    },
                    files: [
                        {
                            expand: true,
                            cwd: 'dist/app/',
                            src: ['*', 'dist/*', 'images/*'],
                            dest: ''
                        }
                    ]
                }
            },

            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            dest: 'dist/',
                            src: [
                                'app/dist/*',
                                'app/images/*',
                                'app/index.html',
                                'app/style.css'
                            ]
                        }
                    ]
                }
            },

            protractor: {
                options: {
                    configFile: "e2e-tests/protractor.conf.js",
                    keepAlive: true,
                    noColor: true,
                    args: {}
                },
                phantomjs: {
                    options: {
                        configFile: "e2e-tests/protractor_phantomjs.conf.js"
                    }
                },
                chrome: {
                    options: {
                        args : {
                            capabilities: {
                                'browserName': 'chrome'
                            }
                        }
                    }
                },
                firefox: {
                    options: {
                        args: {
                            capabilities: {
                                'browserName': 'firefox'
                            }
                        }
                    }
                }
            },

            express: {
                options: {
                    // Override defaults here
                },
                fakeRestServer: {
                    options: {
                        port: 5000,
                        script: 'e2e-tests/mockRestApiServer/mockServer.js'
                    }
                }
            },

            ngconstant: {
                options: {
                    name: 'opentele.config',
                    dest: 'app/config.js'
                },
                e2e: {
                    constants: {
                        appConfig: {
                            version: "<%= pkg.version %>",
                            loggingEnabled: false,
                            loggingUrl: "http://localhost:3000/collectionapi/reports"
                        },
                        restConfig: {
                            baseUrl: 'http://localhost:5000/opentele-citizen-server/'
                        }
                    }
                },
                dev: {
                    constants: {
                        appConfig: {
                            version: "<%= pkg.version %>",
                            loggingEnabled: false,
                            loggingUrl: "http://localhost:3000/collectionapi/reports"
                        },
                        restConfig: {
                            baseUrl: 'http://localhost:8080/opentele-citizen-server/'
                        }
                    }
                },
            }
        });

        // Loading of tasks and registering tasks
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.loadNpmTasks('grunt-buddyjs');
        grunt.loadNpmTasks('grunt-complexity');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-html2js');
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-lesslint');
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-ng-constant');
        grunt.loadNpmTasks('grunt-protractor-runner');
        grunt.loadNpmTasks('grunt-war');
        grunt.loadNpmTasks('grunt-zip');

        grunt.registerTask('analyse', ['bower', 'jshint', 'complexity', 'buddyjs', 'lesslint']);

        grunt.registerTask('dev', ['bower', 'ngconstant:e2e',
            'express:fakeRestServer', 'connect:app', 'watch:dev']);
        grunt.registerTask('dev-no-net', ['ngconstant:e2e',
            'express:fakeRestServer', 'connect:app', 'watch:dev']);
        grunt.registerTask('compile', ['bower', 'ngconstant:dev',
            'connect:app', 'jshint', 'html2js:dist',
            'concat:dev', 'ngAnnotate:opentele', 'clean:temp']);
        grunt.registerTask('dev-no-test', ['bower', 'ngconstant:e2e',
            'express:fakeRestServer', 'connect:app', 'watch:devCompile']);
        grunt.registerTask('dev-real-server', ['bower',
            'ngconstant:devRealRest', 'connect:appVisible', 'watch:devCompile']);

        var unitTestConfig = ['bower', 'jshint', 'less:dev', 'ngconstant:dev',
            'html2js:dist'];
        grunt.registerTask('ci-unittest',
            unitTestConfig.concat('karma:ciUnit'));
        grunt.registerTask('unittest', unitTestConfig.concat('karma:unit'));
        grunt.registerTask('unittest-debug', unitTestConfig.concat('karma:debug'));

        var e2eBaseConfig = ['bower', 'ngconstant:e2e',
            'express:fakeRestServer', 'connect:app', 'less:dev', 'html2js:dist',
            'concat:dev', 'ngAnnotate:opentele', 'clean:temp'];
        grunt.registerTask('e2etest-chrome',
            Array.prototype.concat(e2eBaseConfig, 'protractor:chrome'));
        grunt.registerTask('e2etest-firefox',
            Array.prototype.concat(e2eBaseConfig, 'protractor:firefox'));
        grunt.registerTask('e2etest-phantomjs',
            Array.prototype.concat(e2eBaseConfig, 'protractor:phantomjs'));
        grunt.registerTask('e2etest-all',
            Array.prototype.concat(e2eBaseConfig, ['protractor:chrome', 'protractor:firefox', 'protractor:phantomjs']));

        grunt.registerTask('package', ['bower', 'ngconstant:dist', 'jshint',
            'less:prod', 'html2js:dist', 'karma:unit', 'concat:prod',
            'ngAnnotate:opentele', 'uglify:dist', 'clean:temp', 'copy:dist',
            'zip:dist', 'war:dist']);

        grunt.registerTask('ci-package', ['bower', 'ngconstant:dist', 'jshint',
            'less:prod', 'html2js:dist', 'concat:prod', 'ngAnnotate:opentele',
            'uglify:dist', 'clean:temp', 'copy:dist', 'zip:dist', 'war:dist']);

        var ciE2EConfig = ['clean:dist', 'bower', 'ngconstant:e2e',
            'jshint', 'less:prod', 'html2js:dist', 'concat:prod',
            'ngAnnotate:opentele', 'uglify:dist', 'clean:temp', 'copy:dist',
            'zip:dist', 'unzip:dist', 'express:fakeRestServer',
            'connect:package'];
        grunt.registerTask('ci-e2etest-chrome', ciE2EConfig.concat('protractor:chrome'));
        grunt.registerTask('ci-e2etest-firefox', ciE2EConfig.concat('protractor:firefox'));
        grunt.registerTask('ci-e2etest-phantomjs', ciE2EConfig.concat('protractor:phantomjs'));

    };

}());
