from flask import Blueprint, request, jsonify
from ...models.User import User
from ..shared import db
from .authentication import hash_password, verify_password

authentication_routes = Blueprint('authentication_routes', __name__)

@authentication_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({"message": "All fields are required."}), 404

    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        return jsonify({"message": "Email taken."}), 404

    new_user = User(name=name, email=email, password_hash=hash_password(password))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Registration Successful!"}), 200

@authentication_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "All fields are required."}), 404

    existing_user = User.query.filter(User.email == email).first()

    if existing_user:
        correct_hashed_password = existing_user.password_hash
        if verify_password(password, correct_hashed_password):
            return jsonify({"message": "Successful login"}), 200

    return jsonify({"message": "Unsuccessful login"}), 404
