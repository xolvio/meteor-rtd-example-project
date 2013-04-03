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
                startPhantom: {
                    cmd: 'killall phantomjs > /dev/null 2>&1; phantomjs --webdriver=4444'
                },
                startKarma: {
                    cmd: 'karma start',
                    bg: true
                },
                killMeteor: {
                    cmd: 'for X in `ps acx | grep -i meteor | awk {"print meteor"}`; do; kill $X; done;'
                },
                startApp: {
                    cmd: 'cd ../app;' +
                        'meteor run --port 3000'
                },
                startMirrorApp: {
                    cmd: 'cd mirror_app;' +
                        'meteor run --port 8000'
                },
                synchronizeMirrorApp: {
                    cmd: 'rsync -av --delete --delay-updates --force --exclude=".meteor/local" ../app/ mirror_app'
                },
                instrumentCode: {
                    cmd: 'istanbul instrument ../app/client -o mirror_app/model;' +
                        'istanbul instrument ../app/client -o mirror_app/client;' +
                        'istanbul instrument ../app/public -o mirror_app/public;' +
                        'istanbul instrument ../app/server -o mirror_app/server;',
                    bg: false
                },
                runTests: {
                    cmd: 'node acceptance/endToEnd.js',
                    bg: false,
                    fail: false
                }
            }
        });
        grunt.loadNpmTasks('grunt-bg-shell');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', [
                'bgShell:synchronizeMirrorApp',
                'bgShell:startPhantom',
                'bgShell:startMirrorApp',
                'bgShell:startKarma',
                'bgShell:startApp',
                'watch'
            ]);
//          'bgShell:runTests']);
    };
})();