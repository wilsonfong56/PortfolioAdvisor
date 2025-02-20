import os
import finnhub
from dotenv import load_dotenv

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

def getPeers(symbol):
    return finnhub_client.company_peers(symbol)

def getIndustry(symbol):
    return finnhub_client.company_profile2(symbol=symbol)

def getInsiderTransactions(symbol):
    return finnhub_client.stock_insider_transactions(symbol, "2025-01-01")

if __name__ == "__main__":
    print(getPeers("TEM"))
    print(getIndustry("TECH"))