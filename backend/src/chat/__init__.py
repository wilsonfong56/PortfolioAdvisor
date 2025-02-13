from flask import jsonify, request, Blueprint
import os
from dotenv import load_dotenv
from astrapy import DataAPIClient


load_dotenv()
client = DataAPIClient(os.getenv("ASTRA_DB_TOKEN"))
db = client.get_database_by_api_endpoint(os.getenv("ASTRA_DB_ENDPOINT"))
collection = db.get_collection(os.getenv("ASTRA_DB_COLLECTION"))

chat_routes = Blueprint('chat_routes', __name__)

@chat_routes.route('/query', methods=['POST'])
def vector_search():
    try:
        data = request.json
        embedding = data.get('embedding')
        if not embedding:
            return jsonify({"error": "No embedding provided"}), 400

        results = collection.find(
            vector=embedding,
            limit=10
        )
        # Convert results to list and extract text field
        documents = [doc for doc in results]

        return jsonify(documents)
    except Exception as e:
        print(f"Error in vector search: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500