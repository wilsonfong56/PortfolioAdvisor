from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
app = Flask(__name__)
CORS(app)

# In memory portfolio for testing
portfolio = []

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
    data = request.json
    stock = {
        "symbol": data.get("symbol"),
        "shares": data.get("shares"),
        "price": data.get("price")
    }
    portfolio.append(stock)
    return jsonify({"message": "Stock added successfully", "portfolio": portfolio}), 201

@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify({"portfolio": portfolio})

@app.route('/portfolio/<string:symbol>', methods=['DELETE'])
def delete_stock(symbol):
    global portfolio
    portfolio = [stock for stock in portfolio if stock["symbol"] != symbol]
    return jsonify({"message": "Stock deleted successfully", "portfolio": portfolio})

if __name__ ==  '__main__':
    app.run(debug=True)