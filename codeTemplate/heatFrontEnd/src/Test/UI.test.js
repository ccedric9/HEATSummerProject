const {Builder,By,Key} = require('selenium-webdriver');
const assert = require('assert');

    const homepageURL = "http://localhost:3000/home";
async function loginAsStaff(){
    let driver = await new Builder().forBrowser('chrome').build();
    try{
        await driver.get("http://localhost:3000/login");

        const username = driver.findElement(By.id("username-input"));
        const password = driver.findElement(By.id("password-input"));

        await username.sendKeys("staff@gmail.com");
        await password.sendKeys("password");

        const submit = await driver.findElement(By.id("submit-btn"));
        await submit.click();
        await driver.sleep(1000);
        //check current web page redirect to Home page after login sucess
        const currentURL = (await driver.getCurrentUrl()).toString();
        assert.strictEqual(currentURL,homepageURL,"Test Failed: " + "URL doesn't direct to homepage after login");

        //check current web page contains correct elements
        // if contains program name 
        // if display corrent year
        // if display corrent assessment information
        
    }   finally{
        // await driver.quit();
    }
}

loginAsStaff();
