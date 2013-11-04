// OTHER DRIVERS / WEBDRIVER BINDINGS
// ----------------------------------
// The code below uses https://code.google.com/p/selenium/wiki/WebDriverJs
//
// but you're free to create your own world, and can setup any driver you like, like these:
//      https://github.com/assaf/zombie
//      http://phantomjs.org/
//      https://github.com/LearnBoost/soda
//      https://github.com/admc/wd

var webBrowser = "chrome",
    scriptTimeout = 2000,
    implicitlyWait = 2000;

var World = function World(ready) {
    var world = this;
    var Webdriver = require('../../rtd/webdrivers/cucumber-webdriver.js')(webBrowser, scriptTimeout, implicitlyWait);

    var init = function (browser) {

        world.webdriver = Webdriver.driver;
        world.browser = browser;
        world.visit = function (url, callback) {
            browser.get(url).then(function () {
                callback();
            });
        };

        ready();
    };

    Webdriver.getBrowser(init);
};

module.exports = {
    World: World
};
