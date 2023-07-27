const puppeteer = require('puppeteer')
const url = 'https://www.google.com/'

const main = async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
    })

    const page = await browser.newPage()
    await page.goto(url)

    //Search 'chrome developer' on Google
    await page.type('.gLFyf', 'chrome developer')
    await page.keyboard.press('Enter')

    //Wait the result page
    await page.waitForSelector('.appbar')

    //Select the first element
    await page.click('.LC20lb')

    //Wait 2 secconds, while the page is opening
    await page.waitForTimeout(2000)

    //Take an Screamshot
    await page.screenshot({ path: 'screenshot.png' })

    //Search the last chrome stable version
    const elements = await page.evaluate((x) => {
        const stableVersion = (document.getElementsByClassName('release-card__icon release-card__icon-stable'))[0].textContent
        return (stableVersion)
    })
    console.log(elements)

    await page.close()
}

main()