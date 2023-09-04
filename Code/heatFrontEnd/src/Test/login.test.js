const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { group } = require('console');

const homepageURL = "http://localhost:3000/home";
const loginURL = "http://localhost:3000/login";

async function login(driver, email, password) {
    await driver.get(loginURL);
    await driver.findElement(By.id("username-input")).sendKeys(email);
    await driver.findElement(By.id("password-input")).sendKeys(password);
    await driver.findElement(By.id("submit-btn")).click();
    await driver.sleep(1000);
}

async function checkHomepage(driver, shouldExist) {
    const currentURL = (await driver.getCurrentUrl()).toString();
    if (shouldExist) {
        assert.strictEqual(currentURL, homepageURL, "URL doesn't direct to homepage after login");
    } else {
        assert.strictEqual(currentURL, loginURL, "URL should remain on login page after failed login");
    }
    // Rest of the code remains the same
}

// group1 test login as staff
async function testStaffLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await login(driver, "staff@gmail.com", "password");
        await checkHomepage(driver, true);
    } finally {
        await driver.quit();
    }
}
// group2 test login as student
async function testStudentLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await login(driver, "student@gmail.com", "password");
        await checkHomepage(driver, true);
    } finally {
        await driver.quit();
    }
}

// group3 test login as fake user
async function testFakeLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await login(driver, "fake@gmail.com", "password");
        await checkHomepage(driver, false);
    } finally {
        await driver.quit();
    }
}

testStaffLogin();
testStudentLogin();
testFakeLogin();
