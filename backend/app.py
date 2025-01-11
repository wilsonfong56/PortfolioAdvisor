from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Server is running"})

@app.route('/stock', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    stock_df = yf.Ticker(symbol).history(period="max")
    return "some stock data"

if __name__ ==  '__main__':
    app.run(debug=True)