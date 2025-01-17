from sqlalchemy.sql import text
from flask import Blueprint
from backend import db

test_routes = Blueprint('test_routes', __name__)

# Test database connection
@test_routes.route('/test_db')
def test_connection():
    try:
        # Perform a simple query to test the connection
        query = "SELECT 1"
        db.session.execute(text(query))
        return "Database connection successful!"
    except Exception as e:
        return f"Database connection failed: {e}"