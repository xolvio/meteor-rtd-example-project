(function () {
    "use strict";

    jasmine.getEnv().defaultTimeoutInterval = 20000;

    // GENERIC MIXIN
    var http = require('http'),
        request = require('request'),
        webdriver = require('../rtd/node_modules/selenium-webdriver'),
        driver,
        flow = webdriver.promise.controlFlow(),
        newRun;

    var getWebdriverSessions = function (callback) {
        request.get({
            url: 'http://localhost:4444/wd/hub/sessions',
            headers: {
                'Content-type': 'application/json'
            }
        }, function (error, response, body) {
            callback(JSON.parse(body).value);
        });
    };

    var getWebdriverSessionStatus = function (sessionId, callback) {
        request.get({
            url: 'http://localhost:4444/wd/hub/session/' + sessionId + '/url',
            headers: {
                'Content-type': 'application/json'
            }
        }, function (error, response) {
            callback(response.statusCode);
        });
    };

    var deleteWebdriverSession = function (sessionId) {
        request.del({
            url: 'http://localhost:4444/wd/hub/session/' + sessionId,
            headers: {
                'Accept': 'application/json'
            }
        }, null);
    };

    var deleteWebdriverSessions = function (sessions) {
        for (var i = 0; i < sessions.length; i += 1) {
            deleteWebdriverSession(sessions[i].id);
        }
    };

    var reuseOrCreateSession = function (sessions) {
        if (sessions.length === 0) {
            driver = require('../rtd/webdrivers/selenium-server.js')(webdriver, { browserName: 'chrome' });
            driver.manage().timeouts().setScriptTimeout(2000);
            driver.manage().timeouts().implicitlyWait(2000);
        } else {
            var tempDriver = require('../rtd/webdrivers/selenium-server.js')(webdriver, { browserName: 'chrome' }, sessions[0].id);
            getWebdriverSessionStatus(sessions[0].id, function (status) {
                if (status !== 200) {
                    deleteWebdriverSessions(sessions);
                    tempDriver = require('../rtd/webdrivers/selenium-server.js')(webdriver, { browserName: 'chrome' });
                }
                tempDriver.manage().timeouts().setScriptTimeout(2000);
                tempDriver.manage().timeouts().implicitlyWait(2000);
                driver = tempDriver;
            });
        }
    };

    getWebdriverSessions(reuseOrCreateSession);

    var resetApp = function () {
        var deferred = webdriver.promise.defer();
        driver.get('http://localhost:8000/reset').then(function () {
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


    var postBackCoverage = function () {
        return driver.executeScript(function () {
            document.postCoverage();
        });
    };

    var waitForWebdriver = function (callback) {
        if (driver) {
            callback();
        }
        newRun = true;
        waitsFor(function () {
            return driver;
        }, "Webdriver did not initialize.\nYou may need to restart RTD", 10000);
        runs(function () {
            callback();
        });
    };

    var error = function (err) {
        console.log('\n');
        console.error(err);
        console.error('Error in acceptance tests');
    };

    // ****************************************************************************************

    var setupPlayers = function () {
        return driver.get('http://localhost:8000/setupPlayers');
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

    beforeEach(function () {
        var ready = false;
        waitForWebdriver(function () {
            resetApp().
                then(setupPlayers).
                then(openApp).
                then(function () {
                    ready = true;
                });
        });
        waitsFor(function () {
            return ready;
        }, "App didn't reset", 10000);
    });

    afterEach(function() {
        var ready = false;
        postBackCoverage().then(function () {
            ready = true;
        });
        waitsFor(function () {
            return ready;
        }, "Coverage didn't postback", 10000);
    });

    describe("Leaderboard functionality", function () {

        it("increases a players score by 5 when the increment button is clicked", function (done) {
            authenticate().
                then(findPlayerByName('Grace Hopper')).
                then(verifyTheirScoreIs10).
                then(selectPlayer).
                then(giveThemFivePoints).
                then(findPlayerByName('Grace Hopper')).
                then(verifyTheirScoreIs15).
                then(function () {
                    done();
                }, error);
        });


//        it("can have a more test here for this spec...", function (done) {
//            finish(done);
//        });

    });

})();