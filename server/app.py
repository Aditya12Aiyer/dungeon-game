from flask import Flask, request, jsonify
from dungeon_ai import get_llama3_response, build_prompt_with_books
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://dungeon-game-5ijq.onrender.com"])  # React frontend

@app.route("/api/dungeon", methods=["POST"])
def dungeon():
    try:
        data = request.get_json()

        # Check for missing parameters
        if not data or "prompt" not in data or "race" not in data or "class" not in data:
            return jsonify({"error": "Missing 'prompt', 'race', or 'class' in the request data"}), 400

        user_log = data.get("prompt", "")  # Game log or current prompt
        race = data.get("race", "")  # Character's race
        char_class = data.get("class", "")  # Character's class

        # Build the full prompt with books, race, and class info
        full_prompt = build_prompt_with_books(user_log, race, char_class)

        # Get the response from Llama3 with the constructed prompt
        response = get_llama3_response(full_prompt)

        if not response:
            return jsonify({"error": "Received empty response from Llama3."}), 500

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
