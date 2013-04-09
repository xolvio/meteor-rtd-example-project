(function () {
    "use strict";

    var webdriver = require('selenium-webdriver');

    var driver = require('./drivers/ghostdriver.js')(webdriver);
//    var driver = require('./drivers/chromedriver.js')(webdriver);
//    var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'safari'});
//    var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'chrome'});
//    var driver = require('./drivers/seleniumserver.js')(webdriver, {'browserName': 'firefox'});

    driver.manage().timeouts().setScriptTimeout(3000);
    driver.manage().timeouts().implicitlyWait(3000);

    var flow = webdriver.promise.controlFlow();

    var findPlayerByName = function (name) {

        var mainDefer = webdriver.promise.defer(),
            mainPromise = mainDefer.promise;

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
        return mainPromise;
    };

    var giveThemPointsFivePoints = function (player) {
        console.log('giveThemPointsFivePoints');
        var mainDefer = webdriver.promise.defer();
        driver.findElement(webdriver.By.className('inc')).then(function (inc) {
            inc.click();
            mainDefer.resolve(player);
        });
        return mainDefer.promise;
    };

    var selectPlayer = function (player) {
        console.log('selectPlayer');
        player.click();
        return player;
    };

    var verifyPoints = function (player, points) {
        console.log('verifyPoints', points);
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

    var done = function (exit) {
        driver.quit();
        process.exit(exit === 1 ? 1 : 0);
    };

    var error = function (e) {
        console.log(e);
        done(1);
    };

    var openWebApp = function() {
        driver.get('http://localhost:8000/reset');
        driver.get('http://localhost:8000');
    };

    openWebApp();

    findPlayerByName('Grace Hopper').
        then(verifyTheyHave10Points).
        then(selectPlayer).
        then(giveThemPointsFivePoints).
        then(function () {
            findPlayerByName('Grace Hopper').
                then(verifyTheyHave15Points).
                then(done);
        }, error);
})();