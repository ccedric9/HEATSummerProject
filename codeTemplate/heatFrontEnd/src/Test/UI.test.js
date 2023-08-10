const {Builder,By,Key} = require('selenium-webdriver');

async function textUI(){
    let driver = await new Builder().forBrowser('chrome').build();
    try{
        await driver.get("http://localhost:3000/login");

        const username = driver.findElement(By.id("username-input"));
        const password = driver.findElement(By.id("password-input"));

        await username.sendKeys("staff@gmail.com");
        await password.sendKeys("password");

        const submit = await driver.findElement(By.id("submit-btn"));

        await submit.click();
        await driver.sleep(9000);
    }   finally{
        // await driver.quit();
    }
} 

textUI();
