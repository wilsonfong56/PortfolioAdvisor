
def add_stock_service(portfolio, symbol, shares, price):
    for item in portfolio:
        if item['symbol'].upper() == symbol.upper():
            dollar_cost = (item['shares'] * item['price']) + (shares * price)
            print("Dollar cost:", dollar_cost)
            avg_cost = dollar_cost / (item['shares'] + shares)
            item['shares'] += shares
            item['price'] = avg_cost
            break
    return portfolio