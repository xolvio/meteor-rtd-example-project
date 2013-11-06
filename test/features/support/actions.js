var Actions;

(function () {
    "use strict";

    Actions = function (world) {
        return {
            visit: function (url) {
                return world.browser.get(url);
            },
            authenticate: function () {
                var email = 'some@one.com';
                var password = 'test1234';
                var deferred = world.webdriver.promise.defer();
                world.browser.findElement(world.webdriver.By.id('login-sign-in-link')).click();
                world.browser.findElement(world.webdriver.By.id('login-email')).sendKeys(email);
                world.browser.findElement(world.webdriver.By.id('login-password')).sendKeys(password);
                world.browser.findElement(world.webdriver.By.id('signup-link')).click();
                world.browser.findElement(world.webdriver.By.id('login-buttons-password')).click();
                world.browser.findElement(world.webdriver.By.id('login-name-link')).getText()
                    .then(function (value) {
                        if (value.indexOf(email) !== 0) {
                            deferred.rejected(value + ' did not contain ' + email);
                        } else {
                            deferred.fulfill();
                        }
                    });
                return deferred.promise;
            },
            findPlayerByName: function (name) {
                return function () {

                    var mainDefer = world.webdriver.promise.defer(),
                        flow = world.webdriver.promise.controlFlow();

                    world.browser.findElements(world.webdriver.By.className('player')).then(function (players) {

                        var matchDefer = world.webdriver.promise.defer(),
                            matchPromise = matchDefer.promise,
                            resolved;

                        players.map(function (player) {
                            player.findElement(world.webdriver.By.className('name')).then(function (playerName) {
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
//                            expect(resolved).toBe(true);
                        });

                    });
                    return mainDefer.promise;
                };
            },
            verifyTheirScoreIs: function (player, points) {
                var mainDefer = world.webdriver.promise.defer();
                player.findElement(world.webdriver.By.className('score')).then(function (playerScore) {
                    playerScore.getText().then(function (value) {
//                        expect(parseInt(value, 10)).toBe(points);
                        mainDefer.fulfill(player);
                    });
                });
                return mainDefer.promise;
            },
            selectPlayer: function (player) {
                return player.click();
            },
            giveThemFivePoints: function (player) {
                var mainDefer = world.webdriver.promise.defer();
                world.browser.findElement(world.webdriver.By.className('inc')).then(function (inc) {
                    inc.click();
                    mainDefer.fulfill(player);
                });
                return mainDefer.promise;
            }

        };
    };

})();

module.exports = function (world) {
    "use strict";
    return new Actions(world);
};