from flask import Blueprint, request, jsonify, session
from ...models.User import User
from ..shared import db
from .authentication import hash_password, verify_password
import re

authentication_routes = Blueprint('authentication_routes', __name__)

@authentication_routes.route('/register', methods=['POST'])
def register():
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
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "All fields are required."})

    existing_user = User.query.filter(User.email == email).first()

    if existing_user:
        correct_hashed_password = existing_user.password_hash
        if verify_password(password, correct_hashed_password):
            session['email'] = email
            return jsonify({"message": "Successful login"})

    return jsonify({"message": "Unsuccessful login"})

@authentication_routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})