(function () {

    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({
            watch: {
                files: [
                    'acceptance/**/*.js',
                    '../app/**/*',
                    '!../app/.meteor/**/*'
                ],
                tasks: ['bgShell:synchronizeMirrorApp', /*'bgShell:instrumentCode',*/ 'bgShell:runTests']
            },
            bgShell: {
                _defaults: {
                    bg: true,
                    stdout: true,
                    stderr: true,
                    fail: true
                },
                startGhostDriver: {
                    cmd: 'phantomjs --webdriver=4444 > /dev/null 2>&1;'
                },
                startKarma: {
                    cmd: 'karma start;'
                },
                killAllBackgroundProcesses: {
                    cmd: "kill `ps -ef|grep -i meteor| grep -v grep| awk '{print $2}'`;" +
                        "kill `ps -ef|grep -i mongod| grep -v grep| awk '{print $2}'`" +
                        "kill `ps -ef|grep -i selenium| grep -v grep| awk '{print $2}'`" +
                        "kill `ps -ef|grep -i karma| grep -v grep| awk '{print $2}'`" +
                        "kill `ps -ef|grep -i phantomjs| grep -v grep| awk '{print $2}'`",
                    fail: false,
                    bg: false
                },
                startApp: {
                    cmd: 'cd ../app;' +
                        'meteor run --port 3000;'
                },
                startMirrorApp: {
                    cmd: 'cd mirror_app;' +
                        'meteor run --port 8000;'
                },
                synchronizeMirrorApp: {
                    cmd: 'rsync -av --delete -q --delay-updates --force --exclude=".meteor/local" ../app/ mirror_app;' +
                        'cp acceptance/fixtures/* mirror_app/server;',
                    bg: false
                },
                instrumentCode: {
                    cmd: 'istanbul instrument ../app/client -o mirror_app/model;' +
                        'istanbul instrument ../app/client -o mirror_app/client;' +
                        'istanbul instrument ../app/public -o mirror_app/public;' +
                        'istanbul instrument ../app/server -o mirror_app/server;',
                    bg: false
                },
                runTests: {
                    cmd: 'jasmine-node acceptance/;',
                    bg: false,
                    fail: false
                }
            }
        });
        grunt.loadNpmTasks('grunt-bg-shell');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('startSeleniumServer', 'blah', function() {
            require('./lib/selenium-launcher.js')(function (er, selenium) {
                console.log('SeleniumServer Started on ' + selenium.host + ':' + selenium.port);
            });
        });

        grunt.registerTask('default', [
            'bgShell:killAllBackgroundProcesses',
            'bgShell:synchronizeMirrorApp',
            'bgShell:startMirrorApp',
            'bgShell:startKarma',
            'bgShell:startApp',
            'startSeleniumServer',
            'watch'
        ]);
//          'bgShell:runTests']);
    };
})();