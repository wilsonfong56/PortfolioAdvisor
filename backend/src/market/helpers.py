import pandas as pd

url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"

def adv_decliners():
    table = pd.read_html(url)[0]
    tickers = table['Symbol'].tolist()
