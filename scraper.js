const puppeteer = require('puppeteer');
// dir-property-list
// title: name ng-binding

const NUMBER_OF_ITEMS = 500;
const ITEMS_PER_PAGE = 20;
const PAGES_TO_SCRAPE = NUMBER_OF_ITEMS / ITEMS_PER_PAGE;

async function run() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    console.log(PAGES_TO_SCRAPE);

    for (let pageNumber = 1; pageNumber <= PAGES_TO_SCRAPE; pageNumber++) {
        const url = `https://www.sreality.cz/en/search/for-sale/commercial-properties?page=${pageNumber}`;
        await page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle0'] });

        await page.evaluate(_ => {
            const selector = 'a[id*=cookie i], a[class*=cookie i], button[id*=cookie i] , button[class*=cookie i]';
            const expectedText = /^(Accept|Accept all cookies|Accept all|Allow|Allow all|Allow all cookies|OK)$/gi;
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                if (element.textContent.trim().match(expectedText)) {
                    element.click();
                    return;
                }
            }
        });

        const list = await page.evaluate(() => {
            const divs = document.querySelectorAll('.name.ng-binding'); // Select all div elements on the page
            const divTexts = Array.from(divs).map(div => div.textContent); // Extract text content from divs
            return divTexts; // Return the extracted text content
        });

        console.log(list);
    }

    await browser.close();
}

run();
