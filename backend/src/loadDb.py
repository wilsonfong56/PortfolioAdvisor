import os
import asyncio
import dotenv
from typing import List
from crawl4ai import AsyncWebCrawler
from langchain_text_splitters import RecursiveCharacterTextSplitter
from openai import OpenAI
from astrapy.db import AstraDBCollection

dotenv.load_dotenv()

class WebScraper:
    def __init__(self):
        self.openai_client = OpenAI(api_key=os.getenv('REACT_APP_OPENAI_API_KEY'))

        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1024,
            chunk_overlap=200
        )

        self.vector_store = AstraDBCollection(
            collection_name=os.getenv("ASTRA_DB_COLLECTION"),
            token=os.getenv("ASTRA_APPLICATION_TOKEN"),
            api_endpoint=os.getenv("ASTRA_DB_ENDPOINT"),
            namespace=os.getenv("ASTRA_DB_NAMESPACE")
        )

    def financial_data_sites(self) -> List[str]:
        return [
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

    async def scrape_and_embed(self, urls: List[str]):
        """Asynchronously scrape websites, split text, and create embeddings"""
        async with AsyncWebCrawler() as crawler:
            for url in urls:
                try:
                    result = await crawler.arun(url=url)

                    clean_text = result.markdown

                    text_chunks = self.text_splitter.split_text(clean_text)

                    for chunk in text_chunks:
                        embedding_response = self.openai_client.embeddings.create(
                            input=chunk,
                            model="text-embedding-3-small",
                            encoding_format="float"
                        )

                        vector = embedding_response.data[0].embedding

                        self.vector_store.insert_one(
                            document={
                                'text': chunk,
                                '$vector': vector
                            }
                        )

                    print(f"Processed {url} successfully")

                except Exception as e:
                    print(f"Error processing {url}: {e}")

    async def run(self):
        """Main async execution method"""

        await self.scrape_and_embed(self.financial_data_sites())

async def main():
    scraper = WebScraper()
    await scraper.run()

if __name__ == "__main__":
    asyncio.run(main())