import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.src.routes import test_routes

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        app.register_blueprint(test_routes)

    return app