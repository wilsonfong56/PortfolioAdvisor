import os
import finnhub
from dotenv import load_dotenv

load_dotenv()
finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

def getPeers(symbol):
    return finnhub_client.company_peers(symbol)

def getIndustry(symbol):
    """
    :param symbol:
    :return:
    """

    """
    sample response:
    {
        "country": "US",
        "currency": "USD",
        "estimateCurrency": "USD",
        "exchange": "NEW YORK STOCK EXCHANGE, INC.",
        "finnhubIndustry": "Technology",
        "ipo": "2020-09-30",
        "logo": "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/PLTR.png",
        "marketCapitalization": 237701.89237323985,
        "name": "Palantir Technologies Inc",
        "phone": "17203583679",
        "shareOutstanding": 2277.02,
        "ticker": "PLTR",
        "weburl": "https://www.palantir.com/"
    }
    """
    return finnhub_client.company_profile2(symbol=symbol)

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