from flask import jsonify, request
import yfinance as yf
from flask import Blueprint
from .portfolio import add_stock_helper

# In memory portfolio for testing
portfolio = [
    { "symbol": 'AAPL', "shares": 10, "price": 180.50 },
    { "symbol": 'GOOGL', "shares": 5, "price": 140.25 }
]

portfolio_routes = Blueprint('portfolio_routes', __name__)

@portfolio_routes.route('/')
def home():
    return jsonify({"message": "Server is running"})

@portfolio_routes.route('/stock', methods=['GET'])
def get_stock_price_history():
    symbol = request.args.get('symbol')
    stock_df = yf.Ticker(symbol).history(period="max")
    return jsonify(stock_df.to_json(orient="records"))

@portfolio_routes.route('/portfolio', methods=['POST'])
def add_stock():
    global portfolio
    data = request.json
    symbol = data.get("symbol")
    shares = data.get("shares")
    price = data.get("price")
    portfolio = add_stock_helper(portfolio, symbol, int(shares), float(price))
    return jsonify({"message": "Stock added successfully", "portfolio": portfolio}), 201

@portfolio_routes.route('/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify({"portfolio": portfolio})

@portfolio_routes.route('/portfolio/<string:symbol>', methods=['DELETE'])
def delete_stock(symbol):
    for item in portfolio:
        if item['symbol'] == symbol:
            portfolio.remove(item)
            break
    return jsonify({"message": "Stock deleted successfully", "portfolio": portfolio})
