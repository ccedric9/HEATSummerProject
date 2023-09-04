const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const mockRequire = require('mock-require');
const { Upcoming } = require('@mui/icons-material');
// const { today } = require('../services/Notification');

const homepageURL = "http://localhost:3000/home";
const notificationURL = "http://localhost:3000/notification";
const addEventURL = "http://localhost:3000/addEvent"; 

async function addAssessment(driver, startDate, endDate, assessmentTitle) {
    const programName = 'Computer Science';
    const unitName = 'Object-Oriented Programming with Java';
    const unitCode = 'COMSM0086';
    const creditPoint = '20';
    const academicYear = 'Year 1';
    const term = 'Term 1';
    
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
    const element = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('submit-event-button'))), waitTimeout);
    // await element.click();
    await element.sendKeys(Key.RETURN);
    await driver.sleep(1000);
}


async function deleteAssessment(driver, assessmentTitle) {
    const waitTimeout = 2000;
    // Locate the assessment element
    const assessmentElement = await driver.findElement(By.xpath(`//*[text()="${assessmentTitle}"]`));
    // Scroll to the assessment element
    await driver.executeScript("arguments[0].scrollIntoView(true);", assessmentElement);
    // Click the assessment element (this might not be necessary but could help)
    await assessmentElement.click();
    // Wait for the edit button to be clickable
    const editButton = await driver.findElement(By.id("edit-button"), waitTimeout);
    // Click the edit button
    await editButton.click();
    // Wait for the delete button to be clickable
    const deleteButton = await driver.findElement(By.id("delete-button"), waitTimeout);
    // Click the delete button using JavaScript
    await driver.executeScript("arguments[0].click();", deleteButton);
    // Wait for the alert to appear
    const alert = await driver.switchTo().alert();

    // Accept the alert (click OK)
    await alert.accept();
    // Wait for a short moment to allow the operation to complete
    await driver.sleep(1000);
    await driver.get(notificationURL);
}



async function ongoingTest() {

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
        const expectedOngoingCountPast = 1;
        console.log('Number of Ongoing Assessments:', ongoingCount);
        assert.strictEqual(ongoingCount, expectedOngoingCountPast, "Ongoing assessments count mismatch");
        const startDate = '09/08/2023';
        const endDate = '18/08/2023';
        const assessmentTitle = 'testtest';
        await addAssessment(driver, startDate, endDate, assessmentTitle);
        await driver.get(notificationURL);
        await driver.wait(until.elementLocated(By.id('ongoingAssessments')), waitTimeout);

        const ongoingAssessmentDivsAfter = await driver.findElements(By.id('ongoingAssessments'));
        const ongoingCountAfter = ongoingAssessmentDivsAfter.length;
        const expectedOngoingCountAfter = 2;
        console.log('Number of Ongoing Assessments:', ongoingCountAfter);
        assert.strictEqual(ongoingCountAfter, expectedOngoingCountAfter, "Ongoing assessments count mismatch");      
        await driver.sleep(2000);        
        deleteAssessment(driver, assessmentTitle);
        await driver.sleep(2000); 

        // upComingTest(driver);
    } finally {
        await driver.quit();
    }
}

async function upComingTest() {
    mockRequire('../services/Notification.js', {
        today: new Date(2022, 10, 28) //delete?
    });
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

        await driver.sleep(1000);
        await driver.get(notificationURL);

        // Wait for the ongoing assessments to load
        const waitTimeout = 20000;
        // await driver.wait(until.elementLocated(By.id('upComingAssessments')), waitTimeout);

        // const upcomingAssessmentDivs = await driver.findElements(By.id('upComingAssessments'));
        // const upcomingCount = 0;
        // if(upcomingAssessmentDivs === null){
        //     upcomingCount = 0;
        // }else{
        //     upcomingCount = upcomingAssessmentDivs.length;
        // }
        // const expectedUpcomingCountPast = 0;
        // console.log('Number of Upcoming Assessments:', upcomingCount);
        // assert.strictEqual(upcomingCount, expectedUpcomingCountPast, "Ongoing assessments count mismatch");
        const startDate1 = '09/09/2023';
        const endDate1 = '18/09/2023';
        const assessmentTitle1 = 'testtest1';
        const startDate2 = '10/09/2023';
        const endDate2 = '10/09/2023';
        const assessmentTitle2 = 'testtest2';
        await addAssessment(driver, startDate1, endDate1, assessmentTitle1);
        await addAssessment(driver, startDate2, endDate2, assessmentTitle2);
        await driver.get(notificationURL);
        await driver.wait(until.elementLocated(By.id('upComingAssessments')), waitTimeout);

        const ongoingAssessmentDivsAfter = await driver.findElements(By.id('upComingAssessments'));
        const ongoingCountAfter = ongoingAssessmentDivsAfter.length;
        const expectedOngoingCountAfter = 2;
        assert.strictEqual(ongoingCountAfter, expectedOngoingCountAfter, "Upcoming assessments count mismatch");      
        await driver.sleep(2000);        
        deleteAssessment(driver, assessmentTitle1);
        await driver.sleep(2000);    
        deleteAssessment(driver, assessmentTitle2);
        await driver.sleep(2000); 
    } finally {
        await driver.quit();
    }
}

async function runTests() {
    await ongoingTest();
    await upComingTest();
}

runTests();

// ongoingTest();
// upComingTest();
