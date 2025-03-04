import os, finnhub
from dotenv import load_dotenv
import asyncio
from datetime import datetime, timedelta

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

async def getPeers(symbol):
    return await asyncio.to_thread(lambda: [peer for peer in finnhub_client.company_peers(symbol) if peer != symbol])

async def getIndustry(symbol):
    return await asyncio.to_thread(lambda: finnhub_client.company_profile2(symbol=symbol)["finnhubIndustry"])

async def getExchangeAndName(symbol):
    data = await asyncio.to_thread(lambda: (finnhub_client.company_profile2(symbol=symbol)))
    return data['exchange'], data['name']

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
    print(f"Fetching recommendations for: {symbols}")

    industry_tasks = [getIndustry(symbol) for symbol in symbols]
    exchange_name_tasks = [getExchangeAndName(symbol) for symbol in symbols]
    peers_tasks = [getPeers(symbol) for symbol in symbols]

    try:
        industries, exchange_names, peers_list = await asyncio.gather(
            asyncio.gather(*industry_tasks),
            asyncio.gather(*exchange_name_tasks),
            asyncio.gather(*peers_tasks)
        )
    except Exception as e:
        print(f"Error during initial fetch: {e}")
        return []

    print(f"Industries: {industries}")
    print(f"Exchange Names: {exchange_names}")
    print(f"Peers List: {peers_list}")

    recommendations = {}

    for i, symbol in enumerate(symbols):
        industry = industries[i]
        exchange, name = exchange_names[i]
        if "NASDAQ" in exchange:
            exchange = "NASDAQ"
        else:
            exchange = "NYSE"
        peers = [peer for peer in peers_list[i] if peer != symbol]

        if industry not in recommendations:
            recommendations[industry] = []

        recommendations[industry].append({"s": f"{exchange}:{symbol}", "d": name})

        # Fetch peers' exchange and name concurrently
        peer_tasks = [getExchangeAndName(peer) for peer in peers]
        try:
            peer_exchange_names = await asyncio.gather(*peer_tasks)  # m calls
        except Exception as e:
            print(f"Error fetching peer data: {e}")
            peer_exchange_names = [(None, None)] * len(peers)

        for j, peer in enumerate(peers):
            peer_exchange, peer_name = peer_exchange_names[j]
            if peer_exchange and peer_name:
                if "NASDAQ" in peer_exchange:
                    peer_exchange = "NASDAQ"
                else:
                    peer_exchange = "NYSE"
                recommendations[industry].append({"s": f"{peer_exchange}:{peer}", "d": peer_name})
    return [
        {"title": industry, "symbols": symbols}
        for industry, symbols in recommendations.items()
    ]

async def getStockInfo(symbol):
    pass

async def getNews(symbol):
    one_month_ago = datetime.now() - timedelta(days=30)
    from_date = one_month_ago.strftime('%Y-%m-%d')
    to_date = datetime.now().strftime('%Y-%m-%d')
    return await asyncio.to_thread(lambda: finnhub_client.company_news(symbol, _from=from_date, to=to_date)[:10])

if __name__ == "__main__":
    #print(getPeers("AAPL"))
    # print(asyncio.run(getExchangeAndName("WFC")))
    #print(getIndustry("TECH"))
    # print(getInsiderTransactions("SLDB"))
    # print(asyncio.run(getRecommendations(["AAPL", "MSFT"])))
    pass
