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

        //check staff page has edit & add event button 
        const homeButton = await driver.findElement(By.id("homeIcon"));
        const addEventButton = await driver.findElement(By.id("addIcon"));
        const editEventButton = await driver.findElement(By.id("editIcon"));
        const userInfoButton = await driver.findElement(By.id("personIcon"));
        const notificationButton = await driver.findElement(By.id("notificationIcon"));
        const logoutButton = await driver.findElement(By.id("logoutIcon"));
        assert.ok(homeButton,"Test Failed: not exist");
        assert.ok(addEventButton,"Test Failed: not exist");
        assert.ok(editEventButton,"Test Failed: not exist");
        assert.ok(userInfoButton,"Test Failed: not exist");
        assert.ok(notificationButton,"Test Failed: not exist");
        assert.ok(logoutButton,"Test Failed: not exist");

    }   finally{
        await driver.quit(); 
    }
}

loginAsStaff();
