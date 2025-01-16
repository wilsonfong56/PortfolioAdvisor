from flask import request
import bcrypt
from ..app import app, db
from ...models.User import User

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

@app.route('/register', methods=['POST'])
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

