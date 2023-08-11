const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const mockRequire = require('mock-require');
// const { today } = require('../services/Notification');

const homepageURL = "http://localhost:3000/home";
const notificationURL = "http://localhost:3000/notification";
const addEventURL = "http://localhost:3000/addEvent"; 

async function addAssessment(driver, startDate, endDate) {
    const programName = 'Computer Science';
    const unitName = 'Object-Oriented Programming with Java';
    const unitCode = 'COMSM0086';
    const creditPoint = '20';
    const academicYear = 'Year 1';
    const term = 'Term 1';
    const assessmentTitle = 'testtest';
    const assessmentType = 'SUMMATIVE';
    const weight = '30';
    const waitTimeout = 20000;

    await driver.get(addEventURL);
    await driver.findElement(By.id("program-name")).sendKeys(programName);
    await driver.findElement(By.id("unit-name")).sendKeys(unitName);
    await driver.findElement(By.id("unit-code")).sendKeys(unitCode);
    await driver.findElement(By.id("unit-credit")).sendKeys(creditPoint);
    await driver.findElement(By.id("year-input")).sendKeys(academicYear);
    await driver.findElement(By.id("term-input")).sendKeys(term);
    await driver.findElement(By.id("assessment-title")).sendKeys(assessmentTitle);
    await driver.findElement(By.id("assessment-type")).sendKeys(assessmentType);
    await driver.findElement(By.id("weight")).sendKeys(weight);
    await driver.findElement(By.id("start")).sendKeys(startDate);
    await driver.sleep(1000);
    await driver.findElement(By.id("end")).sendKeys(endDate);
    await driver.sleep(1000);
    // await driver.findElement(By.id("location")).sendKeys(password);
    // await driver.findElement(By.id("summary")).sendKeys(password);
    // await driver.findElement(By.id("submit-event")).click();
    const element = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('submit-event-button'))), waitTimeout);
    await element.click();
    

    await driver.sleep(1000);
}

async function loginAsStaff() {

    mockRequire('../services/Notification.js', {
        today: new Date(2022, 10, 28) //delete?
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

        await driver.get(notificationURL);

        // Wait for the ongoing assessments to load
        const waitTimeout = 20000;
        await driver.wait(until.elementLocated(By.id('ongoingAssessments')), waitTimeout);

        const ongoingAssessmentDivs = await driver.findElements(By.id('ongoingAssessments'));
        const ongoingCount = ongoingAssessmentDivs.length;
        const expectedOngoingCountPast = 2;
        console.log('Number of Ongoing Assessments:', ongoingCount);
        assert.strictEqual(ongoingCount, expectedOngoingCountPast, "Ongoing assessments count mismatch");
        const startDate = '09/08/2023';
        const endDate = '18/08/2023';
        await addAssessment(driver, startDate, endDate)


        await driver.get(notificationURL);
        await driver.wait(until.elementLocated(By.id('ongoingAssessments')), waitTimeout);

        const ongoingAssessmentDivsAfter = await driver.findElements(By.id('ongoingAssessments'));
        const ongoingCountAfter = ongoingAssessmentDivsAfter.length;
        const expectedOngoingCountAfter = 3;
        console.log('Number of Ongoing Assessments:', ongoingCountAfter);
        assert.strictEqual(ongoingCountAfter, expectedOngoingCountAfter, "Ongoing assessments count mismatch");              

    } finally {
        await driver.quit();
        // mockRequire.stop('../services/Notification.js');
    }
}

loginAsStaff();
