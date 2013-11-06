var leaderboardStepDefinitions = null;

(function () {
    "use strict";

    leaderboardStepDefinitions = function () {

        this.World = require("../support/world.js").World;
        require("../support/hooks.js")(this);

        this.Given(/^I authenticate$/, function (callback) {
            this.actions.authenticate().then(function () {
                callback();
            });
        });

        this.Given(/^"(.*)" has a score of (\d+)$/, function (person, score, callback) {
            var self = this;
            this.actions.findPlayerByName(person)().then(
                function (player) {
                    self.actions.verifyTheirScoreIs(player, score).
                        then(function () {
                            callback();
                        });
                });
        });

        this.When(/^I give "(.*)" (\d+) points$/, function (person, score, callback) {
            this.actions.findPlayerByName(person)().
                then(this.actions.selectPlayer).
                then(this.actions.giveThemFivePoints).
                then(function () {
                    callback();
                });
        });

        this.Then(/^"(.*)" has a score of (\d+)$/, function (person, score, callback) {
            var self = this;
            this.actions.findPlayerByName(person)().then(
                function (player) {
                    self.actions.verifyTheirScoreIs(player, score).
                        then(function () {
                            callback();
                        });
                });
        });
    };

})();

module.exports = leaderboardStepDefinitions;