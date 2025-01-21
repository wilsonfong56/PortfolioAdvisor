import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

const scrapePage = async (url) => {
    try {
        const loader = new PuppeteerWebBaseLoader(url, {
            launchOptions: {
                headless: true
            },
            gotoOption: {
                waitUntil: "domcontentloaded"
            },
            evaluate: async (page, browser) => {
                const result = await page.evaluate(() => document.body.innerHTML)
                await browser.close()
                return result
            }
        })
        return (await loader.scrape())?.replace(/<[^>]*>?/gm, '')
    } catch (error) {
        console.error(`Error scraping page at ${url}:`, error)
        return null
    }
}

const cleanText = (text) => {
    // Replace excessive whitespace
    text = text.replace(/\s+/g, ' ').trim();
    // Remove non-financial noise (e.g., excessive HTML remnants)
    text = text.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
    // Keep numbers, symbols, and letters
    text = text.replace(/[^a-zA-Z0-9$%.,+\-–()\s]/g, ''); // Allow financial symbols
    return text;
};

const scrapePage2 = async (url) => {
    try {
        const loader = new PuppeteerWebBaseLoader(url, {
            launchOptions: { headless: true },
            gotoOption: { waitUntil: "networkidle2" },
            evaluate: async (page, browser) => {
                // Wait for specific financial content (adjust selector as needed)
                await page.waitForSelector("body");
                const content = await page.evaluate(() => {
                    const body = document.body;
                    return body ? body.innerText : null;
                });
                await browser.close();
                return content;
            }
        });
        const rawContent = await loader.scrape();
        return rawContent ? cleanText(rawContent) : null;
    } catch (error) {
        console.error(`Error scraping page at ${url}:`, error);
        return null;
    }
};

const res1 = await scrapePage("https://en.wikipedia.org/wiki/List_of_public_corporations_by_market_capitalization")
const res2 = await scrapePage2("https://en.wikipedia.org/wiki/List_of_public_corporations_by_market_capitalization")

console.log("res1:", res1)
console.log("res2:", res2)