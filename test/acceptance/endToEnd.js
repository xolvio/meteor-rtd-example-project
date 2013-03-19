var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().build();

driver.get('http://www.google.com');

driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
driver.findElement(webdriver.By.name('btnG')).click();
driver.wait(function() {
    return driver.getTitle().then(function(title) {
        var r = title === 'webdriver - Google Search';
        console.log('Should be true', r);
        return r;
    });
}, 1000);

driver.quit();