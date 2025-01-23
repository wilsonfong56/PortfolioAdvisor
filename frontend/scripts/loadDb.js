import { DataAPIClient } from "@datastax/astra-db-ts"
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { OpenAI } from "openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });

const news_sites = [
    "https://finance.yahoo.com/?fr=yhssrp_catchall",
    "https://www.reuters.com/",
    "https://www.bloomberg.com/",
    "https://www.cnbc.com/",
    "https://www.sec.gov/",
    "https://seekingalpha.com/",
    "https://www.investopedia.com/",
    "https://www.fool.com/",
    "https://www.marketwatch.com/",
    "https://stockanalysis.com/",
]
const financialData = [
    "https://www.google.com/finance/",
    "https://www.nasdaq.com/",
    "https://coinmarketcap.com/",
    "https://www.coingecko.com/",
    "https://www.bea.gov/",
    "https://companiesmarketcap.com/",
    "https://companiesmarketcap.com/most-profitable-companies/",
    "https://companiesmarketcap.com/largest-companies-by-revenue/",
    "https://companiesmarketcap.com/top-companies-by-pe-ratio/",
    "https://companiesmarketcap.com/top-companies-by-dividend-yield/",
    "https://companiesmarketcap.com/top-companies-by-operating-margin/",
    "https://companiesmarketcap.com/usa/largest-companies-in-the-usa-by-market-cap/",
    "https://companiesmarketcap.com/usa/most-profitable-american-companies/",
    "https://companiesmarketcap.com/usa/largest-american-companies-by-revenue/",
    "https://companiesmarketcap.com/usa/american-companies-ranked-by-pe-ratio/",
    "https://companiesmarketcap.com/usa/american-companies-ranked-by-operating-margin/",
    "https://en.wikipedia.org/wiki/List_of_public_corporations_by_market_capitalization",
    "https://www.tradingview.com/markets/world-stocks/worlds-largest-companies/",
    "https://hedgefollow.com/Largest-Hedge-Fund-Buys.php",
    "https://hedgefollow.com/Largest-Hedge-Fund-Sells.php",
    "https://hedgefollow.com/top-hedge-funds.php",
    "https://hedgefollow.com/popular-hedge-funds.php",
    "https://hedgefollow.com/largest-hedge-funds.php",
    "https://hedgefollow.com/hedge-funds-101.php",
    "https://hedgefollow.com/hedge-fund-tracker",
    "https://hedgefollow.com/largest-insider-buys.php",
    "https://hedgefollow.com/largest-insider-sells.php",
    "https://hedgefollow.com/hot-stocks.php",
    "https://hedgefollow.com/consensus-stock-buys.php",
    "https://hedgefollow.com/consensus-stock-sells.php",
    "https://hedgefollow.com/dividend-aristocrats.php",

]

const client = new DataAPIClient(process.env.REACT_APP_ASTRA_APPLICATION_TOKEN);
const db = client.db(process.env.REACT_APP_ASTRA_DB_ENDPOINT, { namespace: process.env.REACT_APP_ASTRA_DB_NAMESPACE });

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
});

const createCollection = async (similarityMetric, defaultMetric = "dot_product") => {
    const res = await db.createCollection(process.env.REACT_APP_ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,
            metric: similarityMetric || defaultMetric
        }
    });
    console.log(res);
}

const loadSampleData = async () => {
    const collection = await db.collection(process.env.REACT_APP_ASTRA_DB_COLLECTION)
    for await ( const url of financialData ) {
        try {
            console.log(`Scraping ${url}...`)
            const content = await scrapePage(url)
            if (!content) {
                console.warn(`Skipping null content for: ${url}`)
                continue;
            }
            const chunks = await splitter.splitText(content)
            for await (const chunk of chunks) {
                const embedding = await openai.embeddings.create({
                    input: chunk,
                    model: "text-embedding-3-small",
                    encoding_format: "float"
                })

                const vector = embedding.data[0].embedding

                const res = await collection.insertOne({
                    $vector: vector,
                    text: chunk
                })
                console.log(res)
            }
        } catch (error) {
            console.error(`Error processing URL: ${url}`, error)
        }
    }
}

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

createCollection().then(() => loadSampleData())