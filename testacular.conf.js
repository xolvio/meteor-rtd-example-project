// Testacular configuration
// Generated on Sun Mar 17 2013 18:10:04 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,

    // stubs come first so they can be available when all the units need them
    'test/unit/stubs.js',

    // models have to be loaded next, otherwise they overwrite any mocked models
    'app/model/**/*.js',

    // the reason we load unit tests next is because they don't depend on the app. On the contrary,
    // they set mocks ahead of time for the units so they have to be loaded first
    'test/unit/**/*.js',

    // now all the dependancies have been sorted, all our units can be loaded
    'app/server/**/*.js',
    'app/client/**/*.js',

    // NOTE: still trying to figure out how to combine Testacular + Jasmine + jQuery + Syn for E2E testing
    // since these run in the browser and hit the end-to-end running app, it doesn't matter where
    // they load as long as the app is running
    //'test/acceptance/**/*.js'
];


// list of files to exclude
exclude = [
    'testacular.conf.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
