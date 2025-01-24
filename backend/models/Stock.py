from ..src.shared import db

class Stock(db.Model):
    __tablename__ = "user_stocks"

    owner = db.Column(db.String(100), nullable=False, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False, primary_key=True)
    shares = db.Column(db.Integer, nullable=False)
    price_bought = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "owner": self.owner,
            "symbol": self.symbol,
            "shares": self.shares,
            "price_bought": self.price_bought
        }

    def __repr__(self):
        return f'<{self.owner}: {self.symbol} - {self.shares} @ {self.price_bought}>'