from ..src.shared import db

class Stock(db.Model):
    __tablename__ = "user_stocks"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner = db.Column(db.String(100), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    price_bought = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<{self.owner}: {self.symbol} - {self.shares} @ {self.price_bought}>'