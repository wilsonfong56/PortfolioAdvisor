from ..app import app
from flask import jsonify, request
from astrapy.db import AstraDB
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

CORS(app)

astra_db = AstraDB(
    token=os.getenv("ASTRA_DB_TOKEN"),
    api_endpoint=os.getenv("ASTRA_DB_ENDPOINT")
)
collection = astra_db.collection(os.getenv("ASTRA_DB_COLLECTION"))

@app.route('/query', methods=['POST'])
def vector_search():
    try:
        data = request.json
        embedding = data.get('embedding')
        if not embedding:
            return jsonify({"error": "No embedding provided"}), 400

        results = collection.vector_find(
            vector=embedding,
            limit=10
        )
        # Convert results to list and extract text field
        documents = [doc for doc in results]

        return jsonify(documents)
    except Exception as e:
        print(f"Error in vector search: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500