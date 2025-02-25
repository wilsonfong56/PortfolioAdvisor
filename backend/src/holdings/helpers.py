import os, requests, finnhub
from dotenv import load_dotenv

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

def getPeers(symbol):
    peers = finnhub_client.company_peers(symbol)
    peers.remove(symbol)
    return peers

def getIndustry(symbol):
    company_profile = finnhub_client.company_profile2(symbol=symbol)
    return company_profile["finnhubIndustry"]

def getExchangeAndName(symbol):
    url = f"https://financialmodelingprep.com/api/v3/search?query={symbol}&apikey={os.getenv("FMP_API_KEY")}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data[0]["exchangeShortName"], data[0]["name"]
    else:
        return f"Error: {response.status_code}"

def getInsiderTransactions(symbol):
    transactions = finnhub_client.stock_insider_transactions(symbol, "2025-01-01")["data"]
    cleaned_up_transactions = []
    for transaction in transactions:
        code = transaction['transactionCode']
        if code == 'P' or code == 'S':
            name = transaction['name']
            date = transaction['transactionDate']
            shareChange = transaction['change']
            price = transaction['transactionPrice']
            transactionAmt = shareChange*price
            cleaned_up_transactions.append({'name': name,
                                             'date': date,
                                             'amount': transactionAmt})

    return cleaned_up_transactions

def getRecommendations(symbols):
    recommendations = {}
    for symbol in symbols:
        industry = getIndustry(symbol)
        exchange, name = getExchangeAndName(symbol)
        peers = getPeers(symbol)
        if industry not in recommendations:
            recommendations[industry] = []
        recommendations[industry].append({"s": exchange+":"+symbol,
                                          "d": name})
        for peer in peers:
            exchange, name = getExchangeAndName(peer)
            recommendations[industry].append({"s": exchange+":"+peer,
                                              "d": name})
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
    print(getRecommendations(["AAPL"]))