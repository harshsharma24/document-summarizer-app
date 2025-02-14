from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')
@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    text = file.read().decode("utf-8")  # Read file as text

    print("Using OpenAI API Key:", openai.api_key)  # Debugging step

    response = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=[{"role": "system", "content": "Summarize the following text:"},
                  {"role": "user", "content": text}]
    )

    return jsonify({"summary": response["choices"][0]["message"]["content"]})


if __name__ == "__main__":
    app.run(debug=True)
