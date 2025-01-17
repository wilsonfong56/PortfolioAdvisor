from flask import jsonify, request
from flask_cors import CORS
from ..app import app
import yfinance as yf

CORS(app)

# In memory portfolio for testing
portfolio = [
    { "symbol": 'AAPL', "shares": 10, "price": 180.50 },
    { "symbol": 'GOOGL', "shares": 5, "price": 140.25 }
]

def add_stock_helper(portfolio, symbol, shares, price):
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

@app.route('/')
def home():
    return jsonify({"message": "Server is running"})

@app.route('/stock', methods=['GET'])
def get_stock_price_history():
    symbol = request.args.get('symbol')
    stock_df = yf.Ticker(symbol).history(period="max")
    return jsonify(stock_df.to_json(orient="records"))

@app.route('/portfolio', methods=['POST'])
def add_stock():
    global portfolio
    data = request.json
    symbol = data.get("symbol")
    shares = data.get("shares")
    price = data.get("price")
    portfolio = add_stock_helper(portfolio, symbol, int(shares), float(price))
    return jsonify({"message": "Stock added successfully", "portfolio": portfolio}), 201

@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify({"portfolio": portfolio})

@app.route('/portfolio/<string:symbol>', methods=['DELETE'])
def delete_stock(symbol):
    for item in portfolio:
        if item['symbol'] == symbol:
            portfolio.remove(item)
            break
    return jsonify({"message": "Stock deleted successfully", "portfolio": portfolio})
