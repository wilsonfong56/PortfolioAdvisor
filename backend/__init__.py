import os
from flask import Flask
from backend.src.routes import test_routes
from backend.src.shared import db
from backend.src.finance import portfolio_routes
from backend.src.chat import chat_routes
from backend.src.authentication import authentication_routes
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        app.register_blueprint(test_routes)
        app.register_blueprint(portfolio_routes)
        app.register_blueprint(chat_routes)
        app.register_blueprint(authentication_routes)

    return app