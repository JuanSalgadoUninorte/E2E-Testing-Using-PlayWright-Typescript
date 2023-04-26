import { test, expect } from '@playwright/test';
import { assertTitle, loadHomePage } from '../helpers';

test.describe.parallel.only('First test suite', () => {

  test('has title', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button')
    await page.type('#user_login', 'some user')
    await page.type('#user_password', 'some userpassword')
    await page.click('text=Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  });

  test('Assertions @OnlyTag', async ({ page }) => {
    await page.goto('http://example.com/');
    await expect(page).toHaveURL('http://example.com/')
    await expect(page).toHaveTitle('Example Domain')
    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  });

  //to skip a test only add the word .skip between test and ('....')
  test('test by juan', async ({ page }) => {
    await page.goto('<here goes the link>')
    await expect(page.locator("//*/ul[contains(@style, 'margin-right:8%')]")).toBeVisible()
    await page.click("//*/ul[contains(@style, 'margin-right:8%')]")
    await page.locator("input[id='username']").fill('<here comes the credentials>')
    await page.locator("input[id='password']").fill('<here comes the credentials>')
    await page.click("button[type='submit']")
    await page.waitForSelector("//*/div[@data-region='paged-content-page']//*/span[@class='multiline']")
    const titles = await page.locator("//*/div[@data-region='paged-content-page']//*/span[@class='multiline']").allInnerTexts()
    for (let title of titles) {
      console.log("The title is: ", title)
    }
  });

  test('Screenshots', async ({ page }) => {
    await page.goto('http://example.com/');
    await page.screenshot({ path: 'screenshots/full_page_screenshots/screenshot.png', fullPage: true })
    const element = await page.$('h1')
    await element.screenshot({ path: 'screenshots/single_element_screenshots/screenshot.png' })
  });

});

test.describe('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('<here goes the link>')
    await expect(page.locator("//*/ul[contains(@style, 'margin-right:8%')]")).toBeVisible()
    await page.click("//*/ul[contains(@style, 'margin-right:8%')]")
    await page.locator("input[id='username']").fill('<here comes the credentials>')
    await page.locator("input[id='password']").fill('<here comes the credentials>')
    await page.click("button[type='submit']")
    await page.waitForSelector("//*/div[@data-region='paged-content-page']//*/span[@class='multiline']")
  })

  test('optimized by juan', async ({ page }) => {
    const titles = await page.locator("//*/div[@data-region='paged-content-page']//*/span[@class='multiline']").allInnerTexts()
    for (let title of titles) {
      console.log("The title is: ", title)
    }
  })

  test('Screenshots inside', async ({ page }) => {
    let date: Date = new Date()
    let mes = date.getMonth()+1
    const fullDate = date.getFullYear() + "-" + mes + "-"+ date.getDate() + " " + date.getHours() + "-" + date.getMinutes();
    await page.screenshot({ path: 'screenshots/full_page_screenshots/screenshot-' + fullDate + '.png', fullPage: true })
  });
})

test("Custom helpers", async ({ page }) => {
  await loadHomePage(page)
  await assertTitle(page)
})