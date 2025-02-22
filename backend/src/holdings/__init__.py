from flask import Blueprint, request, jsonify
from .helpers import *


holdings_routes = Blueprint('holdings_routes', __name__)

@holdings_routes.route('/getPeers', methods=['GET'])
def getPeers():
    data = request.json
    symbol = data.get("symbol")
    print(f'Symbol: {symbol}')
    peers = helpers.getPeers(symbol)
    return jsonify(peers=peers)

@holdings_routes.route('/getIndustry', methods=['GET'])
def getIndustry():
    data = request.json
    symbol = data.get("symbol")
    industry = helpers.getIndustry(symbol)
    return jsonify(industry=industry)

@holdings_routes.route('/getInsiderTrans', methods=['GET'])
def getInsiderTrans():
    data = request.json
    symbol = data.get("symbol")
    transactions = helpers.getInsiderTransactions(symbol)
    return jsonify(transactions=transactions)