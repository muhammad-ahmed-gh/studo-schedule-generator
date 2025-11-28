from flask import Flask, render_template, request, jsonify
from src.priority import add_study_tasks

app = Flask(__name__)

# Serve Frontend
@app.route("/")
def index():
    return render_template("index.html")

# Generate New Schedule
@app.route("/api/generate", methods=["POST"])
def generate_schedule():
    try:
        data = request.get_json()

        if not data or "schedule" not in data:
            return jsonify({"error": "Missing schedule data"}), 400

        schedule = data["schedule"]

        # Run backend scheduling logic
        new_schedule = add_study_tasks(schedule)

        return jsonify({"schedule": new_schedule})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)