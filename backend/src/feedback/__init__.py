import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from flask_mail import Message
from backend.src.shared import mail

load_dotenv()

feedback_routes = Blueprint('feedback_routes', __name__)

@feedback_routes.route('/submitFeedback', methods=['POST'])
@jwt_required
def send_email():
    data = request.get_json()
    feedback = data.get('feedback')
    msg = Message("Feedback", recipients=[os.getenv("APP_EMAIL")])
    msg.body = feedback
    mail.send(msg)
    return jsonify({"message": "Email sent successfully"}), 200