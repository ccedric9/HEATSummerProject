const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

async function registerAndLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Generate random user info
        const randomUser = 'user' + Math.floor(Math.random() * 1000) + '@example.com';
        const randomFirstName = 'John' + Math.floor(Math.random() * 1000);
        const randomLastName = 'Doe' + Math.floor(Math.random() * 1000);
        const randomPassword = 'password' + Math.floor(Math.random() * 1000);

        // Navigate to the signup page
        await driver.get("http://localhost:3000/signup");

        // Fill out the registration form
        await driver.findElement(By.id("first-name")).sendKeys(randomFirstName);
        await driver.findElement(By.id("last-name")).sendKeys(randomLastName);
        await driver.findElement(By.id("email")).sendKeys(randomUser);
        await driver.findElement(By.id("password")).sendKeys(randomPassword);
        await driver.findElement(By.id("confirm-password")).sendKeys(randomPassword);
        // Add other fields here...

        // Click the register button
        await driver.findElement(By.id("register-button")).click();

        // Wait for navigation to the login page
        await driver.sleep(500);

        // Fill out the login form with the same random user info
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("username-input")).sendKeys(randomUser);
        await driver.findElement(By.id("password-input")).sendKeys(randomPassword);

        // Click the login button
        let submit = await driver.findElement(By.id("submit-btn"));
        await submit.click();

        // Wait for navigation to the login page
        await driver.sleep(500);


        // Check if the user has been redirected to the homepage
        let currentURL = (await driver.getCurrentUrl()).toString();
        const homepageURL = "http://localhost:3000/home";
        assert.strictEqual(currentURL, homepageURL, "Test Failed: " + "URL doesn't direct to homepage after login");

        // Additional checks to make sure the login was successful
        // ...

    } finally {
        // Close the browser
        await driver.quit();
    }
}

registerAndLogin();
