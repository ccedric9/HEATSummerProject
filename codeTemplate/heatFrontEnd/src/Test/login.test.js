const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

jest.setTimeout(10000); 

test('Login Test', async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000/');

        await driver.findElement(By.css('input[type="text"]')).sendKeys('staff@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('password');

        await driver.findElement(By.css('button[type="submit"]')).click();


        console.log('Login attempted');
    } catch (error) {
        console.error('An error occurred during the test:', error);
    } finally {
        await driver.quit();
    }
});
