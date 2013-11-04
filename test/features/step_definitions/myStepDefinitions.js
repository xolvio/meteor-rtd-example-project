var myStepDefinitionsWrapper = function () {
    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given(/^I am a new customer$/, function (callback) {
        this.visit('http://localhost:8000/reset', callback);
    });

    this.When(/^I go to the home page$/, function (callback) {
        this.visit('http://localhost:8000', callback);
    });

    this.Then(/^I should a "(.*)" link$/, function (link, callback) {
        this.browser.findElement(this.webdriver.By.partialLinkText(link)).getText().then(function () {
            callback();
        });
    });
};

module.exports = myStepDefinitionsWrapper;