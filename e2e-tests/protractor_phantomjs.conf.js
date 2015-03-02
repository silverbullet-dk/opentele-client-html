exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'areas/**/*.js'
	],

	baseUrl: 'http://localhost:8000/app/',

	framework: 'jasmine',

	capabilities: {
		'browserName': 'phantomjs',
		'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',
		'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
	},

	onPrepare: function() {
		require('jasmine-reporters');
		jasmine.getEnv().addReporter(
			new jasmine.JUnitXmlReporter('xmloutput', true, true, '../test_out/e2e.xml'));
	},

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
