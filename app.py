from flask import Flask, render_template
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/healthz")
def healthz():
    return "ok", 200

if __name__ == "__main__":
    port = int(os.getenv("PORT", "888"))
    app.run(debug=False, port=port, host="0.0.0.0")
