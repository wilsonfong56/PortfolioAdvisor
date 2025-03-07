import asyncio
import os
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask
from flask_jwt_extended import JWTManager
from backend.src import loadDb
from backend.src.feedback import feedback_routes
from backend.src.holdings import holdings_routes
from backend.src.loadDb import WebScraper
from backend.src.shared import db, mail
from backend.src.portfolio import portfolio_routes
from backend.src.chat import chat_routes
from backend.src.authentication import authentication_routes
from backend.models import User, Stock
from dotenv import load_dotenv
from flask_cors import CORS

from backend.src.stripe import stripe_routes

load_dotenv()

async def scrape():
    await loadDb.main()
def scrape_wrapper():
    asyncio.run(scrape())
scheduler = BackgroundScheduler()
scheduler.add_job(func=scrape_wrapper, trigger='cron', hour=21, minute=58)

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv("APP_EMAIL")
    app.config['MAIL_USERNAME'] = os.getenv("APP_EMAIL")
    app.config['MAIL_PASSWORD'] = os.getenv("APP_PASSWORD")
    JWTManager(app)
    db.init_app(app)
    mail.init_app(app)
    with app.app_context():
        # db.create_all()
        app.register_blueprint(authentication_routes)
        app.register_blueprint(portfolio_routes)
        app.register_blueprint(chat_routes)
        app.register_blueprint(feedback_routes)
        app.register_blueprint(holdings_routes)
        app.register_blueprint(stripe_routes)
    scheduler.start()
    return app