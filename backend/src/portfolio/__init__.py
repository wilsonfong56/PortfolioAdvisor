from flask import jsonify, request
from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from .portfolio import add_stock_helper
from ...models.Stock import Stock
from sqlalchemy import and_
from ..shared import db

portfolio_routes = Blueprint('portfolio_routes', __name__)

@portfolio_routes.route('/portfolio', methods=['POST'])
@jwt_required()
def add_stock():
    data = request.json
    stock = data.get("stock")
    email = get_jwt_identity()
    symbol = stock.get("symbol").upper()
    shares = stock.get("shares")
    price = stock.get("price")
    add_stock_helper(email, symbol, int(shares), float(price))
    portfolio = [stock.to_dict() for stock in Stock.query.filter(Stock.owner == email).all()]
    return jsonify({"message": "Stock added successfully", "portfolio": portfolio}), 201

@portfolio_routes.route('/portfolio', methods=['GET'])
@jwt_required()
def get_portfolio():
    email = get_jwt_identity()
    portfolio = [stock.to_dict() for stock in Stock.query.filter(Stock.owner == email).all()]
    return jsonify({"portfolio": portfolio})

@portfolio_routes.route('/portfolio', methods=['DELETE'])
@jwt_required()
def delete_stock():
    data = request.json
    email = get_jwt_identity()
    symbol = data.get("symbol").upper()
    shares_to_delete = float(data.get("shares"))
    
    row = Stock.query.filter(and_(Stock.owner == email, Stock.symbol == symbol)).first()
    
    if not row:
        return jsonify({"error": "Stock not found"}), 404
        
    if shares_to_delete >= row.shares:
        db.session.delete(row)
    else:
        row.shares -= shares_to_delete
        
    db.session.commit()
    portfolio = [stock.to_dict() for stock in Stock.query.filter(Stock.owner == email).all()]
    return jsonify({"message": "Stock updated successfully", "portfolio": portfolio})
