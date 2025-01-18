from flask import Blueprint
from flask import request
from ...models.User import User
from ..shared import db

authentication_routes = Blueprint('authentication_routes', __name__)

@authentication_routes.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    if not name or not email or not password:
        return "All fields are required."

    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        return "Email taken."

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return "Registration Successful!"

