const puppeteer = require("puppeteer");
const { Sequelize } = require("sequelize");
const config = require("../config")["development"];
const Property = require("./models/Property");

const NUMBER_OF_ITEMS = 500;
const ITEMS_PER_PAGE = 20;
const PAGES_TO_SCRAPE = NUMBER_OF_ITEMS / ITEMS_PER_PAGE;
const SEED_URL =
  "https://www.sreality.cz/en/search/for-sale/commercial-properties";

async function run() {
  async function connectToPostgres() {
    const sequelize = new Sequelize(config.postgres.options);
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  config.postgres.client = connectToPostgres();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    userDataDir: "/app/user-data",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  console.log("Started scraping!");

  for (let pageNumber = 1; pageNumber <= PAGES_TO_SCRAPE; pageNumber++) {
    console.log(`Page ${pageNumber} of ${PAGES_TO_SCRAPE}`);
    const url = `${SEED_URL}?page=${pageNumber}`;
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    });

    await page.evaluate((_) => {
      const selector =
        "a[id*=cookie i], a[class*=cookie i], button[id*=cookie i] , button[class*=cookie i]";
      const expectedText =
        /^(Accept|Accept all cookies|Accept all|Allow|Allow all|Allow all cookies|OK)$/gi;
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        if (element.textContent.trim().match(expectedText)) {
          element.click();
          return;
        }
      }
    });

    const titles = await page.evaluate(() => {
      const titleElements = document.querySelectorAll(".name.ng-binding");
      return Array.from(titleElements).map((el) => el.textContent);
    });

    const propertyDivs = await page.evaluate(() => {
      const imageDivs = document.querySelectorAll(".property.ng-scope"); // Select all property divs
      const imageUrls = [];

      for (const propertyDiv of imageDivs) {
        const imgElements = propertyDiv.querySelectorAll("img"); // Select all img elements within the current property div
        const imgUrls = Array.from(imgElements)
          .map((img) => img.src) // Extract the src attribute values
          .slice(0, 3); // Take the first 3 images
        imageUrls.push(imgUrls);
      }

      return imageUrls;
    });

    for (let i = 0; i < titles.length; i++) {
      await Property.create({ title: titles[i], image_urls: propertyDivs[i] });
    }
  }
  console.log("Finished scraping!");
  await browser.close();
}

run();
