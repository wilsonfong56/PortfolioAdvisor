import os, requests, finnhub
from dotenv import load_dotenv
import asyncio
import aiohttp

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

async def getPeers(symbol):
    return await asyncio.to_thread(lambda: [peer for peer in finnhub_client.company_peers(symbol) if peer != symbol])

async def getIndustry(symbol):
    return await asyncio.to_thread(lambda: finnhub_client.company_profile2(symbol=symbol)["finnhubIndustry"])

async def getExchangeAndName(symbol):
    url = f"https://financialmodelingprep.com/api/v3/search?query={symbol}&apikey={os.getenv("FMP_API_KEY")}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data[0]["exchangeShortName"], data[0]["name"]
            else:
                return "Error", f"Error: {response.status}"

async def getInsiderTransactions(symbol):
    transactions = await asyncio.to_thread(lambda: finnhub_client.stock_insider_transactions(symbol, "2025-01-01")["data"])
    cleaned_up_transactions = [
        {
            'name': transaction['name'],
            'date': transaction['transactionDate'],
            'amount': transaction['change'] * transaction['transactionPrice']
        }
        for transaction in transactions if transaction['transactionCode'] in ['P', 'S']
    ]

    return cleaned_up_transactions

async def getRecommendations(symbols):
    recommendations = {}
    industry_tasks = [getIndustry(symbol) for symbol in symbols]
    exchange_name_tasks = [getExchangeAndName(symbol) for symbol in symbols]
    peers_tasks = [getPeers(symbol) for symbol in symbols]
    industries, exchange_names, peers_list = await asyncio.gather(
        asyncio.gather(*industry_tasks),
        asyncio.gather(*exchange_name_tasks),
        asyncio.gather(*peers_tasks)
    )
    for i, symbol in enumerate(symbols):
        industry = industries[i]
        exchange, name = exchange_names[i]
        peers = peers_list[i]

        if industry not in recommendations:
            recommendations[industry] = []

        recommendations[industry].append({"s": f"{exchange}:{symbol}", "d": name})

        # Fetch peers' exchange and name concurrently
        peer_tasks = [getExchangeAndName(peer) for peer in peers]
        peer_exchange_names = await asyncio.gather(*peer_tasks)

        for j, peer in enumerate(peers):
            peer_exchange, peer_name = peer_exchange_names[j]
            recommendations[industry].append({"s": f"{peer_exchange}:{peer}", "d": peer_name})

    # Converting to JSON array for React component
    recommendations = [
        {
            "title": industry,
            "symbols": symbols
        }
        for industry, symbols in recommendations.items()
    ]
    return recommendations

if __name__ == "__main__":
    #print(getPeers("AAPL"))
    # print(getExchangeAndName("AAPL"))
    #print(getIndustry("TECH"))
    # print(getInsiderTransactions("SLDB"))
    print(asyncio.run(getRecommendations(["AAPL", "MSFT"])))
