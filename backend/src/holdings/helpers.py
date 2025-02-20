import os
import finnhub
from dotenv import load_dotenv

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

def getPeers(symbol):
    return finnhub_client.company_peers(symbol)

if __name__ == "__main__":
    print(getPeers("AAPL"))