import os
from flask import Flask
from flask_session import Session
from backend.src.routes import test_routes
from backend.src.shared import db
from backend.src.finance import portfolio_routes
from backend.src.chat import chat_routes
from backend.src.authentication import authentication_routes
from backend.models import User, Stock
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins="http://localhost:3000")

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    db.init_app(app)
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SESSION_SQLALCHEMY'] = db
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "None"  # For cross-origin cookies
    app.config["SESSION_COOKIE_SECURE"] = False
    with app.app_context():
        # db.create_all()
        app.register_blueprint(authentication_routes)
        app.register_blueprint(test_routes)
        app.register_blueprint(portfolio_routes)
        app.register_blueprint(chat_routes)

    # Session(app)
    return app