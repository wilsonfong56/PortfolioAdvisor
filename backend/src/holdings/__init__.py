from flask import Blueprint, request, jsonify
from .helpers import *


holdings_routes = Blueprint('holdings_routes', __name__)

@holdings_routes.route('/getPeers', methods=['GET'])
def getPeers():
    data = request.json
    symbols = data.get("symbols")
    peers_dict = {}
    for symbol in symbols:
        peers = helpers.getPeers(symbol)
        peers_dict[symbol] = peers
    return jsonify(peers=peers_dict)

@holdings_routes.route('/getIndustry', methods=['GET'])
def getIndustry():
    data = request.json
    symbols = data.get("symbols")
    industry_dict = {}
    for symbol in symbols:
        industry = helpers.getIndustry(symbol)
        industry_dict[symbol] = industry
    return jsonify(industry=industry_dict)

@holdings_routes.route('/getInsiderTrans', methods=['GET'])
def getInsiderTrans():
    data = request.json
    symbols = data.get("symbols")
    trans_dict = {}
    for symbol in symbols:
        transactions = helpers.getInsiderTransactions(symbol)
        trans_dict[symbol] = transactions
    return jsonify(transactions=trans_dict)

@holdings_routes.route('/getRecommendations', methods=['GET'])
def getRecommendations():
    data = request.json
    symbols = data.get("symbols")
    recommendations = helpers.getRecommendations(symbols)
    return jsonify(recommendations=recommendations)
