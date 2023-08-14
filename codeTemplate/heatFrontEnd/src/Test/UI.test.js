const {Builder,By,Key,until} = require('selenium-webdriver');
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
        year = "Year 1";
        term = "Term 1";
        assessmentTitle = "Quiz 4";
        assessmentType = "SUMMATIVE";
        weight = 10;
        start = "01-11-2022";
        end = "07-11-2022";
        location = "MVB 110";
        summary = "not available";

        const programNameTextField = await driver.findElement(By.id("program-name"));
        const unitNameTextField = await driver.findElement(By.id("unit-name"));
        const unitCodeTextField = await driver.findElement(By.id("unit-code"));
        const unitCreditTextField = await driver.findElement(By.id("unit-credit"));
        const yearTextField = await driver.findElement(By.id("year-input"));
        const termTextField = await driver.findElement(By.id("term-input"));
        const titleTextField = await driver.findElement(By.id("assessment-title"));
        const typeTextField = await driver.findElement(By.id("assessment-type"));
        const weightTextField = await driver.findElement(By.id("weight"));
        const startTextField = await driver.findElement(By.id("start"));
        const endTextField = await driver.findElement(By.id("end"));
        const locationTextField = await driver.findElement(By.id("location"));
        const summaryTextField = await driver.findElement(By.id("summary"));

        await programNameTextField.sendKeys(programName);
        await unitNameTextField.sendKeys(unitName);
        await unitCodeTextField.sendKeys(unitCode);
        await unitCreditTextField.sendKeys(creditPoints);
        await yearTextField.sendKeys(year);
        await termTextField.sendKeys(term);
        await titleTextField.sendKeys(assessmentTitle);
        await typeTextField.sendKeys(assessmentType);
        await weightTextField.sendKeys(weight);
        await startTextField.sendKeys(start);
        await endTextField.sendKeys(end);
        await locationTextField.sendKeys(location);
        await summaryTextField.sendKeys(summary);
        
        //submit the above result
        await summaryTextField.sendKeys(Key.TAB);
        await summaryTextField.sendKeys(Key.RETURN);
        await driver.sleep(500);
        //check if redirect to home page after add event
        currentURL = (await driver.getCurrentUrl()).toString();
        assert.strictEqual(currentURL,homepageURL,"Test Failed: " + "URL doesn't direct to homepage after add event");
        // //check the new added element list in database
        const events = await driver.findElements(By.className('event'));
        let isExist = false;
        let length = events.length;
        for (let i = 0 ; i < events.length;i++){
            let event = await events[i].getText()
            if(event === 'Quiz 4'){
                isExist = true;
            }
        }
        assert.ok(isExist,"Test Failed: item does not exist");
        // find it in the edit page 
        for (let i = 0 ;i < 30 ; i++){
            await driver.actions().sendKeys(Key.ARROW_UP).perform();
            await driver.sleep(100);
        }

        const editPageButton = driver.findElement(By.id('editIcon'));
        editPageButton.click(); 

        for (let i = 0 ;i < 30 ; i++){
            await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
            await driver.sleep(100);
        }

        currentURL = (await driver.getCurrentUrl()).toString();
        const editPageURL = "http://localhost:3000/EditMenu";
        assert.strictEqual(currentURL,editPageURL,"Test Failed: " + "URL error - editpage");

        //check the new added element exist in the table
        const tableMenu = await driver.findElements(By.css('table tr'));
        let lastRow = tableMenu[tableMenu.length - 1];
        assert.ok(lastRow);
        let lastRowProgram = await lastRow.findElement(By.xpath('./td[1]')).getText();
        let lastRowUnitName = await lastRow.findElement(By.xpath('./td[2]')).getText();
        let lastRowTitle = await lastRow.findElement(By.xpath('./td[3]')).getText();
        assert.strictEqual(lastRowProgram,"Computer Science", "Test failed :" +lastRowProgram);
        assert.strictEqual(lastRowUnitName,"Intro to Computer Science", "Test failed :" +lastRowUnitName);
        assert.strictEqual(lastRowTitle,"Quiz 4", "Test failed : last row does not exist" + lastRowTitle);

        //test edit function
        let editLastRowButton = lastRow.findElement(By.className('btn'));
        await editLastRowButton.click();

        for (let i = 0 ;i < 10 ; i++){
        await driver.actions().sendKeys(Key.ARROW_UP).perform();
        await driver.sleep(100);
        }

        let editYearField = await driver.findElement(By.id("edit-year"));
        let editTermField = await driver.findElement(By.id("edit-term"));
        let editTypeField = await driver.findElement(By.id("edit-type"));
        let editEndField = await driver.findElement(By.id("edit-end"));
        let editLocationField = await driver.findElement(By.id("edit-location"));
        let editFeedbackField = await driver.findElement(By.id("edit-feedback"));
        let editSummaryField = await driver.findElement(By.id("edit-summary"));

        year = "Year 2";
        term = "Term 2";
        assessmentType = "CAPSTONESUMMATIVE";
        end = "22-11-2022";
        location = "QB 110";
        let feedback = "Not available";
        summary = "Available now!";

        await editYearField.sendKeys(year);
        await editTermField.sendKeys(term);
        await editTypeField.sendKeys(assessmentType);
        await editEndField.sendKeys(end);
        await editLocationField.clear();
        await editLocationField.sendKeys(location);
        await editFeedbackField.sendKeys(feedback);
        await editFeedbackField.sendKeys(Key.TAB);
        for (let i = 0 ;i < 5 ; i++){
            await driver.actions().sendKeys(Key.ARROW_DOWN).perform();
            await driver.sleep(100);
        }
        await editSummaryField.clear();
        await editSummaryField.sendKeys(summary);
        let editPageSubmit = await driver.findElement(By.id("edit-submit"));
        await editPageSubmit.click();

        //check webpage contains this edited assessment 
        for (let i = 0 ;i < 20 ; i++){
            await driver.actions().sendKeys(Key.ARROW_UP).perform();
            await driver.sleep(50);
        }
        const moduleBtn = await driver.findElement(By.id("module-btn"));
        await moduleBtn.click();

        const nextYearBtn = await driver.findElement(By.id("nextYear-btn"));
        await nextYearBtn.click();


        let rightModules = await driver.findElements(By.className("text-name-p"));
        for (let module of rightModules){
            let text = await module.getText();
            if(text==='Quiz 4') isExist = true;
        }
        assert.ok(isExist,"test failed" + rightModules.length);
    }   finally{
        await driver.quit(); 
    }
}

loginAsStaff();
