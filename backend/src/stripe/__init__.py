import os

import stripe.checkout
from flask import Blueprint, jsonify

stripe_routes = Blueprint("stripe_routes", __name__)

stripe.api_key = os.getenv("STRIPE_API_KEY")

@stripe_routes.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": "MarketMentor Subscription",
                        },
                        "unit_amount": 1000, # in cents ($10) CHANGE LATER
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url="http://127.0.0.1:5050/success",
            cancel_url="http://127.0.0.1:5050/cancel",
        )
        return jsonify(id=session.id)
    except Exception as e:
        return jsonify(error=str(e)), 500

@stripe_routes.route("/success")
def success():
    return "Payment successful!"

@stripe_routes.route("/cancel")
def cancel():
    return "Payment canceled!"