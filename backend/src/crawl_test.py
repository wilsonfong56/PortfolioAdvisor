import asyncio
from crawl4ai import *
from astrapy.db import AstraDB
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

astra_db = AstraDB(
    token=os.getenv("ASTRA_APPLICATION_TOKEN"),
    api_endpoint=os.getenv("ASTRA_DB_ENDPOINT")
)
collection = astra_db.collection(os.getenv("ASTRA_DB_COLLECTION"))

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(
            url="https://finance.yahoo.com/?fr=yhssrp_catchall"
        )
        print(result.markdown)

if __name__ == "__main__":
    # asyncio.run(main())
    chunk = input()
    openai_client = OpenAI(api_key=os.getenv('REACT_APP_OPENAI_API_KEY'))
    embedding_response = openai_client.embeddings.create(
        input=chunk,
        model="text-embedding-3-small",
        encoding_format="float"
    )

    embedding = embedding_response.data[0].embedding
    results = collection.vector_find(
        vector=embedding,
        limit=10
    )
    # Convert results to list and extract text field
    documents = [doc for doc in results]
    for doc in documents:
        print(doc)