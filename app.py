from flask import Flask, render_template, jsonify, request
import json, os

app = Flask(__name__)
PLAN_FILE = os.path.join(app.root_path, "data", "plan.json")

def load_plan():
    with open(PLAN_FILE) as f:
        return json.load(f)

def save_plan(plan):
    with open(PLAN_FILE, "w") as f:
        json.dump(plan, f, indent=2)

@app.route("/")
def index():
    plan = load_plan()
    # pass enumerate explicitly
    return render_template("index.html", plan=plan, enumerate=enumerate)

@app.route("/api/complete", methods=["POST"])
def toggle_complete():
    date_req = request.json.get("date")
    plan = load_plan()
    for entry in plan:
        if entry["date"] == date_req:
            entry["completed"] = not entry["completed"]
            break
    save_plan(plan)
    return jsonify(success=True)

if __name__ == "__main__":
    app.run(debug=True)
