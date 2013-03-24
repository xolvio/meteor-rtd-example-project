module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: ['acceptance/**/*.js', '../app/**/*', '!../app/.meteor/**/*'],
            tasks: [/*'bgShell:synchronizeAcceptanceApp', /*'bgShell:instrumentCode',*/ 'bgShell:runTests']
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
            startAcceptanceApp: {
                cmd: 'cd acceptance-app;' +
                    'meteor run --port 8000'
            },
            synchronizeAcceptanceApp: {
                cmd: 'rsync -av --delete --delay-updates --force --exclude=".meteor/local" ../app/ acceptance-app'
            },
            instrumentCode: {
                cmd: 'istanbul instrument ../app/client -o acceptance-app/model;' +
                     'istanbul instrument ../app/client -o acceptance-app/client;' +
                     'istanbul instrument ../app/public -o acceptance-app/public;' +
                     'istanbul instrument ../app/server -o acceptance-app/server;',
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
          'bgShell:startPhantom',
        'bgShell:startAcceptanceApp',
        'bgShell:startKarma',
        'bgShell:startApp',
        'watch']);
//          'bgShell:runTests']);
};