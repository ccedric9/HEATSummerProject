const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const mockRequire = require('mock-require');
const { today } = require('../services/Notification');

const homepageURL = "http://localhost:3000/home";
const notificationURL = "http://localhost:3000/notification"; // Add the URL for the Notification page

async function loginAsStaff() {

    mockRequire('../services/Notification.js', {
        today: new Date(2022, 10, 28) // Replace with the desired test date
    });

    console.log('Today after mocking:', require('../services/Notification.js').today);

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get("http://localhost:3000/login");

        const username = driver.findElement(By.id("username-input"));
        const password = driver.findElement(By.id("password-input"));

        await username.sendKeys("staff@gmail.com");
        await password.sendKeys("password");

        const submit = await driver.findElement(By.id("submit-btn"));
        await submit.click();
        await driver.sleep(1000);

        const currentURL = (await driver.getCurrentUrl()).toString();
        assert.strictEqual(currentURL, homepageURL, "Test Failed: URL doesn't direct to homepage after login");

        // Navigate to the Notification page
        await driver.get(notificationURL);

        // Wait for the ongoing assessments to load
        const waitTimeout = 20000; // adjust as needed
        await driver.wait(until.elementLocated(By.id('ongoingAssessments')), waitTimeout);

        // Find all the ongoing assessment div elements
        const ongoingAssessmentDivs = await driver.findElements(By.id('ongoingAssessments'));
        // Count the number of ongoing assessments
        const ongoingCount = ongoingAssessmentDivs.length;
        const expectedOngoingCountPast = 2;
        console.log('Number of Ongoing Assessments:', ongoingCount);
        assert.strictEqual(ongoingCount, expectedOngoingCountPast, "Ongoing assessments count mismatch");
    } finally {
        await driver.quit();
        mockRequire.stop('../services/Notification.js');
    }
}

loginAsStaff();
