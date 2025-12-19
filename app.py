from flask import Flask, request, jsonify, render_template
from src.priority import Scheduler

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate_schedule():
    data = request.get_json(silent=True)
    scheduler = Scheduler(data)
    result = scheduler.generate_study_tasks()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
