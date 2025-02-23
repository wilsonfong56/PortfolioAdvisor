import os
import finnhub
from dotenv import load_dotenv

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

def getPeers(symbol):
    peers = finnhub_client.company_peers(symbol)
    peers.remove(symbol)
    return peers

def getIndustry(symbol):
    return finnhub_client.company_profile2(symbol=symbol)["finnhubIndustry"]

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



if __name__ == "__main__":
    print(getPeers("AAPL"))
    # print(getIndustry("TECH"))
    # print(getInsiderTransactions("SLDB"))