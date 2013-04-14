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
                    cmd: 'killall phantomjs > /dev/null 2>&1; phantomjs --webdriver=4444 > /dev/null 2>&1;'
                },
                startKarma: {
                    cmd: 'karma start;'
                },
                killMeteor: {
                    cmd: 'for X in `ps acx | grep -i meteor | awk {"print meteor"}`; do; kill $X; done;'
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

        grunt.registerTask('default', [
            'bgShell:synchronizeMirrorApp',
            'bgShell:startMirrorApp',
            //'bgShell:startPhantom',
            'bgShell:startKarma',
            'bgShell:startApp',
            'watch'
        ]);
//          'bgShell:runTests']);
    };
})();