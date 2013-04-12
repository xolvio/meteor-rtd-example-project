(function () {
    "use strict";

    var webdriver = require('selenium-webdriver');

    // WARNING: There are many strange problems with using PhantomJS/GhostDriver, which don't exist on real browsers.
    // PHANTOM INTERMITTENT ISSUE: [Unable to find element with id 'login-sign-in-link'], restarting helps
    // PHANTOM INTERMITTENT ISSUE: [Element is no longer attached to the DOM] - restarting helps
    // PHANTOM INTERMITTENT ISSUE: [Element does not exist in cache] after the 3rd findPlayerByName
    // PHANTOM INTERMITTENT ISSUE: [Click failed: Error: INVALID_STATE_ERR] after the method 'authenticate'
    // PHANTOM INTERMITTENT ISSUE: [Expected player to have 15 points, but they had 10], seems the clicks don't register
    // var driver = require('./drivers/ghostdriver.js')(webdriver);
    // var driver = require('./drivers/chromedriver.js')(webdriver);
    // var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'safari'});
    var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'chrome'});
    // var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'firefox'});

    driver.manage().timeouts().setScriptTimeout(5000);
    driver.manage().timeouts().implicitlyWait(5000);

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
        return function () { // <<< WTF: Why If I don't wrap with this, I get [TypeError: Object [object Object] has no method 'apply']

            var mainDefer = webdriver.promise.defer();

            driver.findElements(webdriver.By.className('player')).then(function (players) {

                var matchDefer = webdriver.promise.defer(),
                    matchPromise = matchDefer.promise;

                players.map(function (player) {
                    player.findElement(webdriver.By.className('name')).then(function (playerName) {
                        flow.execute(function () {
                            playerName.getText().then(function (value) {
                                if (value === name) {
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

    var verifyPoints = function (player, points) {
        var mainDefer = webdriver.promise.defer();
        player.findElement(webdriver.By.className('score')).then(function (playerScore) {
            playerScore.getText().then(function (value) {
                if (parseInt(value, 10) === points) {
                    mainDefer.resolve(player);
                } else {
                    mainDefer.reject(new Error('Expected player to have ' + points + ' points, but they had ' + value));
                }
            });
        });
        return mainDefer.promise;
    };

    var verifyTheyHave10Points = function (player) {
        return verifyPoints(player, 10);
    };

    var verifyTheyHave15Points = function (player) {
        return verifyPoints(player, 15);
    };

    var done = function (exit, msg, args) {
        driver.quit().then(function () {
            if (typeof exit !== 'object' && exit !== 0) {
                console.log('\n');
                console.error(msg, args);
            } else {
                console.log('TESTS PASSED');
            }
        });
    };

    var error = function () {
        done(1, 'TESTS FAILED', arguments);
    };

    resetApp().
        then(setupPlayers).
        then(openApp).
        then(authenticate).
        then(findPlayerByName('Grace Hopper')).
        then(verifyTheyHave15Points).
        then(selectPlayer).
        then(giveThemFivePoints).
        then(findPlayerByName('Grace Hopper')).
        then(verifyTheyHave15Points).
        then(done, error);
})();
