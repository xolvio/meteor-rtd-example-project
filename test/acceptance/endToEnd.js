var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().build();

driver.get('http://localhost:8000');

driver.wait(function() {
    return driver.getTitle().then(function(title) {
        return title === 'Leaderboards';
    });
}, 1000);

driver.quit();