var World = null;

(function () {
    "use strict";

    // The code below uses https://code.google.com/p/selenium/wiki/WebDriverJs
    // https://github.com/assaf/zombie
    // http://phantomjs.org/
    // https://github.com/LearnBoost/soda
    // https://github.com/admc/wd

    World = function World(ready) {

        var Webdriver = require('../../rtd/webdrivers/cucumber-webdriver.js')('chrome', 2000, 2000);
        var Actions = require('./actions.js')(this);

        var world = this;
        Webdriver.getBrowser(function (browser) {
            world.webdriver = Webdriver.driver;
            world.browser = browser;
            world.actions = Actions;
            ready();
        });
    };
})();

module.exports = {
    World: World
};
