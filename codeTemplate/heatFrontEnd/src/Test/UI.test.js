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

        let submit = await driver.findElement(By.id("submit-btn"));
        await submit.click();
        await driver.sleep(500);
        //check current web page redirect to Home page after login sucess
        let currentURL = (await driver.getCurrentUrl()).toString();
        assert.strictEqual(currentURL,homepageURL,"Test Failed: " + "URL doesn't direct to homepage after login");

        //check current web page contains correct elements
        // if contains program name 
        // if display corrent year
        // if display corrent assessment information

    
        const homeButton = await driver.findElement(By.id("homeIcon"));
        const addEventButton = await driver.findElement(By.id("addIcon"));
        const editEventButton = await driver.findElement(By.id("editIcon"));
        const userInfoButton = await driver.findElement(By.id("personIcon"));
        const notificationButton = await driver.findElement(By.id("notificationIcon"));
        const logoutButton = await driver.findElement(By.id("logoutIcon"));

        //check staff page has all the buttons include add / edit  
        assert.ok(homeButton,"Test Failed: not exist");
        assert.ok(addEventButton,"Test Failed: not exist");
        assert.ok(editEventButton,"Test Failed: not exist");
        assert.ok(userInfoButton,"Test Failed: not exist");
        assert.ok(notificationButton,"Test Failed: not exist");
        assert.ok(logoutButton,"Test Failed: not exist");

        //test if staff can use add event functionality
        await addEventButton.click();
        await driver.sleep(500);
        currentURL = (await driver.getCurrentUrl()).toString();
        const addEventPage = "http://localhost:3000/addEvent";
        assert.strictEqual(currentURL,addEventPage,"Test Failed: " + "URL doesn't direct to add page after click on add button");
        //check addEvent page elements
        let currentPageTitle = await driver.findElement(By.css('h3'));
        const h3Text= await currentPageTitle.getText();
        //contains title
        assert.strictEqual(h3Text,"Add an assessment","Test Failed: h3 title not found" );
        //contains input labels
        let labels = await driver.findElements(By.css('label'));

        assert.strictEqual(labels.length,13);

        let programName = await labels[0].getText();
        let unitName = await labels[1].getText();
        let unitCode = await labels[2].getText();
        let creditPoints = await labels[3].getText();
        let year = await labels[4].getText();
        let term =await labels[5].getText();
        let assessmentTitle =await labels[6].getText();
        let assessmentType =await labels[7].getText();
        let weight =await labels[8].getText();
        let start =await labels[9].getText();
        let end =await labels[10].getText();
        let location =await labels[11].getText();
        let summary =await labels[12].getText();

        assert.strictEqual(programName,"Program Name");
        assert.strictEqual(unitCode,"Unit Code");
        assert.strictEqual(term,"Term");
        assert.strictEqual(weight,"Weight (%)");
        assert.strictEqual(end,"End Date");
        assert.strictEqual(summary,"Assessment Summary");

        //Submit an event 
        programName = "Computer Science";
        unitName = "Intro to Computer Science";
        unitCode = "COMSM0084";
        creditPoints = 10;
        year = 1;
        term = 1;
        assessmentTitle = "Quiz 4";
        assessmentType = "SUMMATIVE";
        weight = 10;
        start = "2022-11-01";
        end = "2022-11-05";
        location = "MVB 115";
        summary = "not available";

        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const associatedInput = await label.findElement(By.xpath('./following-sibling::input'));
            if(i === 0) await associatedInput.sendKeys(programName);
            if(i === 1) await associatedInput.sendKeys(unitName);
            if(i === 2) await associatedInput.sendKeys(unitCode);
            if(i === 3) await associatedInput.sendKeys(creditPoints);
            if(i === 4) await associatedInput.sendKeys(year);
            if(i === 5) await associatedInput.sendKeys(term);
            if(i === 6) await associatedInput.sendKeys(assessmentTitle);
            if(i === 7) await associatedInput.sendKeys(assessmentType);
            if(i === 8) await associatedInput.sendKeys(weight);
            if(i === 9) await associatedInput.sendKeys(start);
            if(i === 10) await associatedInput.sendKeys(end);
            if(i === 11) await associatedInput.sendKeys(location);
            if(i === 12) await associatedInput.sendKeys(summary);
        }

        let submitEventButton = await driver.findElement(By.id('submit-event'));
        await submitEventButton.click();
        await driver.sleep(100);
        

    }   finally{
        await driver.quit(); 
    }
}

loginAsStaff();
