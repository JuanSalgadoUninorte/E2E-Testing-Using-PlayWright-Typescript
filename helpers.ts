export async function loadHomePage(page) {
    await page.goto('http://example.com/')
}

export async function assertTitle(page) {
    await page.waitForSelector('h1')
}