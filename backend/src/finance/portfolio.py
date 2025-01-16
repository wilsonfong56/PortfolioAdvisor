from flask import jsonify, request
from flask_cors import CORS
from ..app import app
import yfinance as yf
from astrapy.db import AstraDB
import os
from dotenv import load_dotenv

load_dotenv()

CORS(app)

astra_db = AstraDB(
    token=os.getenv("ASTRA_DB_TOKEN"),
    api_endpoint=os.getenv("ASTRA_DB_ENDPOINT")
)
collection = astra_db.collection(os.getenv("ASTRA_DB_COLLECTION"))

# In memory portfolio for testing
portfolio = [
    { "symbol": 'AAPL', "shares": 10, "price": 180.50 },
    { "symbol": 'GOOGL', "shares": 5, "price": 140.25 }
]


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
    portfolio = add_stock_service(portfolio, symbol, int(shares), float(price))
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

@app.route('/query', methods=['POST'])
def vector_search():
    try:
        data = request.json
        embedding = data.get('embedding')
        if not embedding:
            return jsonify({"error": "No embedding provided"}), 400

        results = collection.vector_find(
            vector=embedding,
            limit=10
        )
        # Convert results to list and extract text field
        documents = [doc for doc in results]

        return jsonify(documents)
    except Exception as e:
        print(f"Error in vector search: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500