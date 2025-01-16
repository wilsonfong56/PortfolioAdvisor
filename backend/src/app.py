import os
from flask import Flask
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Test database connection
@app.route('/test_db')
def test_connection():
    try:
        # Perform a simple query to test the connection
        query = "SELECT 1"
        db.session.execute(text(query))
        return "Database connection successful!"
    except Exception as e:
        return f"Database connection failed: {e}"

if __name__ ==  '__main__':
    app.run(debug=True)