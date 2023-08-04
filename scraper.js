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

        const titles = await page.evaluate(() => {
            const titleElements = document.querySelectorAll('.name.ng-binding');
            return Array.from(titleElements).map(el => el.textContent);
        });

        const propertyDivs = await page.evaluate(() => {
            const propertyDivs = document.querySelectorAll('.property.ng-scope'); // Select all property divs
            const propertyData = [];

            for (const propertyDiv of propertyDivs) {
                const imgElements = propertyDiv.querySelectorAll('img'); // Select all img elements within the current property div
                const imgUrls = Array.from(imgElements)
                    .map(img => img.src) // Extract the src attribute values
                    .slice(0, 3); // Take the first 3 images
                propertyData.push(imgUrls);
            }

            return propertyData;
        });

        const properties = [];
        for (let i = 0; i < titles.length; i++) {
            const property = {
                title: titles[i],
                images: propertyDivs[i]
            }
            properties.push(property);
        }

        console.log(properties);
    }

    await browser.close();
}

run();
