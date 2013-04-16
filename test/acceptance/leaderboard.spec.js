(function () {
    "use strict";

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    var webdriver = require('selenium-webdriver'),
        driver;

    var resetApp = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000/reset').then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    };

    var setupPlayers = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000/setupPlayers').then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    };

    var openApp = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000').then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    };

    var authenticate = function () {
        var email = 'some@one.com';
        var password = 'test1234';
        var deferred = webdriver.promise.defer();
        driver.findElement(webdriver.By.id('login-sign-in-link')).click();
        driver.findElement(webdriver.By.id('login-email')).sendKeys(email);
        driver.findElement(webdriver.By.id('login-password')).sendKeys(password);
        driver.findElement(webdriver.By.id('signup-link')).click();
        driver.findElement(webdriver.By.id('login-buttons-password')).click();
        driver.findElement(webdriver.By.id('login-name-link')).getText()
            .then(function (value) {
                if (value.indexOf(email) !== 0) {
                    deferred.rejected(value + ' did not contain ' + email);
                } else {
                    deferred.resolve();
                }
            });
        return deferred.promise;
    };

    var flow = webdriver.promise.controlFlow();

    var findPlayerByName = function (name) {
        return function () {

            var mainDefer = webdriver.promise.defer();

            driver.findElements(webdriver.By.className('player')).then(function (players) {

                var matchDefer = webdriver.promise.defer(),
                    matchPromise = matchDefer.promise,
                    resolved;

                players.map(function (player) {
                    player.findElement(webdriver.By.className('name')).then(function (playerName) {
                        flow.execute(function () {
                            playerName.getText().then(function (value) {
                                if (value === name) {
                                    resolved = true;
                                    matchDefer.resolve(player);
                                }
                            });
                        });
                    });
                });

                flow.execute(function () {
                    matchPromise.then(function (player) {
                        mainDefer.resolve(player);
                    });
                    expect(resolved).toBe(true);
                });

            });
            return mainDefer.promise;
        };
    };

    var selectPlayer = function (player) {
        return player.click();
    };

    var giveThemFivePoints = function (player) {
        var mainDefer = webdriver.promise.defer();
        driver.findElement(webdriver.By.className('inc')).then(function (inc) {
            inc.click();
            mainDefer.resolve(player);
        });
        return mainDefer.promise;
    };

    var verifyTheirScoreIs = function (player, points) {
        var mainDefer = webdriver.promise.defer();
        player.findElement(webdriver.By.className('score')).then(function (playerScore) {
            playerScore.getText().then(function (value) {
                expect(parseInt(value, 10)).toBe(points);
                mainDefer.resolve(player);
            });
        });
        return mainDefer.promise;
    };

    var verifyTheirScoreIs10 = function (player) {
        return verifyTheirScoreIs(player, 10);
    };

    var verifyTheirScoreIs15 = function (player) {
        return verifyTheirScoreIs(player, 15);
    };

    var finish = function (done) {
        driver.quit().then(function () {
            done();
        });
    };

    var error = function () {
        driver.quit().then(function () {
            console.log('\n');
            console.error('ACCEPTANCE TESTS ERROR');
            console.error(arguments);
        });
    };

    describe("Leaderboard functionality", function () {

        beforeEach(function () {

            /*
             YOU CAN USE ANY OF THESE DRIVERS, PROVIDED YOU HAVE LAUNCHED THE RELEVANT SERVER
             --------------------------------------------------------------------------------
             // SERVER COMMAND: phantomjs --webdriver=4444
             driver = require('./drivers/ghost-driver.js')(webdriver);

             // SERVER COMMAND: chromedriver
             driver = require('./drivers/chrome-driver.js')(webdriver);

             // SERVER COMMAND: java -jar ./selenium-server-standalone-x.y.z.jar
             driver = require('./drivers/selenium-server.js')(webdriver, {'browserName': 'chrome'});
             driver = require('./drivers/selenium-server.js')(webdriver, {'browserName': 'safari'});
             driver = require('./drivers/selenium-server.js')(webdriver, {'browserName': 'firefox'});

             WARNING WHEN USING GHOST DRIVER (PHANTOM JS)
             --------------------------------------------
             There are many intermittent problems with using PhantomJS/GhostDriver, which don't exist on real browsers
             ISSUE 1: [Unable to find element with id 'login-sign-in-link'], restarting helps
             ISSUE 2: [Element is no longer attached to the DOM] - restarting helps
             ISSUE 3: [Element does not exist in cache] after the 3rd findPlayerByName
             ISSUE 4: [Click failed: Error: INVALID_STATE_ERR] after the method 'authenticate'
             ISSUE 5: [Expected player to have 15 points, but they had 10] seems the clicks don't always register
             */

            driver = require('./drivers/selenium-server.js')(webdriver, {
                browserName: 'chrome',
                seleniumProtocol: 'WebDriver',
                'chrome.switches': ['--window-size=1366,768'] // this is being ignored
            });

            driver.manage().timeouts().setScriptTimeout(5000);
            driver.manage().timeouts().implicitlyWait(5000);

            resetApp().
                then(setupPlayers).
                then(openApp);
        });

        it("increases a players score by 5 when the increment button is clicked", function (done) {
            authenticate().
                then(findPlayerByName('Grace Hopper')).
                then(verifyTheirScoreIs10).
                then(selectPlayer).
                then(giveThemFivePoints).
                then(findPlayerByName('Grace Hopper')).
                then(verifyTheirScoreIs15).
                then(finish(done), error);
        });

//        it("can have a more test here for this spec...", function (done) {
//            finish(done);
//        });

    });
})();