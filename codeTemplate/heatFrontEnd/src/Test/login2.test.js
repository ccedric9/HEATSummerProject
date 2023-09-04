const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

const homepageURL = "http://localhost:3000/home";

async function checkInputSize(driver, elementId, expectedWidth, expectedHeight) {
    const inputElement = await driver.findElement(By.id(elementId));
    const rect = await inputElement.getRect();
    assert.strictEqual(rect.width, expectedWidth, "Width does not match expected value");
    assert.strictEqual(rect.height, expectedHeight, "Height does not match expected value");
  }
  
async function checkNavbarBeforeLogin(driver) {
  try {
    await driver.findElement(By.id("homeIcon")); 
    assert.fail("Navbar should not be accessible before login");
  } catch (e) {
  }
}

async function checkNavbarAfterLogin(driver) {
  const homeIconElement = await driver.findElement(By.id("homeIcon")); 
  assert.ok(homeIconElement, "Navbar should be accessible after login");
}

async function loginTest(username, password, shouldBeSuccessful) {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get("http://localhost:3000/login");
    await checkNavbarBeforeLogin(driver);
    await checkInputSize(driver, "username-input", 542, 56); 
    await checkInputSize(driver, "password-input", 542, 56); 
    
    const usernameElement = driver.findElement(By.id("username-input"));
    const passwordElement = driver.findElement(By.id("password-input"));

    await usernameElement.sendKeys(username);
    await passwordElement.sendKeys(password);

    const submit = await driver.findElement(By.id("submit-btn"));
    await submit.click();
    await driver.sleep(1000);

    const currentURL = (await driver.getCurrentUrl()).toString();
    if (shouldBeSuccessful) {
      assert.strictEqual(currentURL, homepageURL, "URL doesn't direct to homepage after login");
      await checkNavbarAfterLogin(driver);
    } else {
      assert.strictEqual(currentURL, "http://localhost:3000/login", "URL shouldn't direct to homepage for invalid credentials");
    }
  } finally {
    await driver.quit();
  }
}

// Group 1
loginTest("staff@gmail.com", "password", true);
// Group 2
loginTest("student@gmail.com", "password", true);
// Group 3
loginTest("fake@gmail.com", "password", false);
