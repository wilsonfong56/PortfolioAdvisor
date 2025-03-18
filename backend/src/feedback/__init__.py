import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from backend.src.shared import mail

load_dotenv()

feedback_routes = Blueprint('feedback_routes', __name__)

@feedback_routes.route('/submitFeedback', methods=['POST'])
@jwt_required()
def send_email():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 422

    feedback = data.get('feedback')
    if not feedback:
        return jsonify({"error": "Feedback is required"}), 422

    user_email = get_jwt_identity()

    msg = Message("Feedback", recipients=[os.getenv("APP_EMAIL")])
    msg.body = f"Feedback from {user_email}:\n\n{feedback}"
    mail.send(msg)
    return jsonify({"message": "Email sent successfully"}), 200