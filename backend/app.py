from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file~~
load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
api_url = os.getenv("OPENROUTER_API_URL")
model_name = os.getenv("OPENROUTER_MODEL_NAME")
debug_mode = os.getenv("DEBUG", "False").lower() == "true"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '')

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": model_name,
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    }

    response = requests.post(
        api_url,
        headers=headers,
        data=json.dumps(payload)
    )

    if response.status_code == 200:
        result = response.json()
        ai_text = result["choices"][0]["message"]["content"]
        return jsonify({"response": ai_text})
    else:
        return jsonify({"error": f"OpenRouter API error (app.py): {response.text}"}), 500


if __name__ == '__main__':
    app.run(debug=debug_mode)
