from flask import Flask, request
import os
from pymongo import MongoClient

app = Flask(__name__, static_folder="./frontend/build", static_url_path="/")

Client = MongoClient(
    "mongodb+srv://runtimeTerror:runtimeTerror1234@cluster0.egyl2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
dbname = Client["RuntimeTerror"]
collection_Projects = dbname["Projects"]


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/create", methods=["POST"])
def create():
    req = request.get_json()
    items = collection_Projects.find({"_id": req["_id"]})
    res = {"created": False}
    if len(list(items)) == 0:
        collection_Projects.insert_one(req)
        res["created"] = True
    return res


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False, port=os.environ.get("PORT", 80))
