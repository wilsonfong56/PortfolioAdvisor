from backend.models.Stock import Stock
from ..shared import db
from sqlalchemy import and_

def add_stock_helper(email, symbol, shares, price):
    existing_stock = Stock.query.filter(and_(Stock.owner == email, Stock.symbol == symbol)).first()
    new_stock = Stock(owner=email, symbol=symbol, shares=shares, price_bought=price)
    if existing_stock:
        prev_shares = existing_stock.shares
        prev_cost = existing_stock.price_bought
        dollar_cost = (prev_shares * prev_cost) + (shares * price)
        avg_cost = dollar_cost / (prev_shares + shares)
        total_shares = prev_shares + shares
        existing_stock.price_bought = avg_cost
        existing_stock.shares = total_shares
    else:
        db.session.add(new_stock)
    db.session.commit()
    return

