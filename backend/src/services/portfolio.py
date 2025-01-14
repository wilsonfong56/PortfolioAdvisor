
def add_stock_service(portfolio, symbol, shares, price):
    for item in portfolio:
        if item['symbol'].upper() == symbol.upper():
            dollar_cost = (item['shares'] * item['price']) + (shares * price)
            avg_cost = dollar_cost / (item['shares'] + shares)
            item['shares'] += shares
            item['price'] = avg_cost
            return portfolio
    new_stock = {'symbol': symbol.upper().strip(), 'shares': shares, 'price': price}
    portfolio.append(new_stock)
    return portfolio