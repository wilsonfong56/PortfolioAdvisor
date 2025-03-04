from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from ...models.User import User
from ..shared import db
from .authentication import hash_password, verify_password
import re

authentication_routes = Blueprint('authentication_routes', __name__)

@authentication_routes.route('/register', methods=['POST'])
def register():
    """
    Register a new user.

    This endpoint allows a user to create an account by providing their name, email, and password.

    Args:
        None (Takes JSON payload from request body):
            - name (str): The user's name.
            - email (str): The user's email address.
            - password (str): The user's password.

    Returns:
        Response (JSON):
            - 200 OK: If registration is successful.
                {
                    "message": "Registration Successful!"
                }
            - 400 Bad Request: If required fields are missing.
                {
                    "message": "Missing field(s)"
                }
            - 409 Conflict: If the email is already taken.
                {
                    "message": "Email taken."
                }
            - 400 Bad Request: If the email format is invalid.
                {
                    "message": "Invalid email"
                }
    Raises:
        None
    """
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({"message": "Missing field(s)"})

    if re.match(email_regex, email) is not None:
        existing_user = User.query.filter(User.email == email).first()
        if existing_user:
            return jsonify({"message": "Email taken."})

        new_user = User(name=name, email=email, password_hash=hash_password(password))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration Successful!"})
    return jsonify({"message": "Invalid email"})

@authentication_routes.route('/login', methods=['POST'])
def login():
    """
    Authenticate a user and provide an access token.

    This endpoint verifies the user's email and password. If the credentials are correct,
    it returns an access token for authentication.

    Args:
        None (Takes JSON payload from request body):
            - email (str): The user's registered email address.
            - password (str): The user's password.

    Returns:
        Response (JSON):
            - 200 OK: If login is successful.
                {
                    "message": "Successful login",
                    "access_token": "your_jwt_token"
                }
            - 400 Bad Request: If required fields are missing.
                {
                    "message": "All fields are required."
                }
            - 401 Unauthorized: If authentication fails.
                {
                    "message": "Unsuccessful login"
                }

    Raises:
        None
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "All fields are required."})

    existing_user = User.query.filter(User.email == email).first()

    if existing_user:
        correct_hashed_password = existing_user.password_hash
        if verify_password(password, correct_hashed_password):
            access_token = create_access_token(identity=email)
            response = jsonify({"message": "Successful login", "access_token": access_token})
            return response

    return jsonify({"message": "Unsuccessful login"})

@authentication_routes.route('/logout', methods=['POST'])
def logout():
    """
    Logout a user.

    This endpoint logs out a user by invalidating their session or token.

    Args:
        None

    Returns:
        Response (JSON):
            - 200 OK: If logout is successful.
                {
                    "message": "Logged out"
                }

    Raises:
        None
    """
    return jsonify({"message": "Logged out"})