from flask import Flask, send_from_directory, jsonify, request, session
import flask
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256
from flask_cors import CORS, cross_origin
import os
import json
import certifi
import hardwareSet

# from api.HelloApiHandler import HelloApiHandler

ca = certifi.where()
app = Flask(__name__, static_folder="frontend/build", static_url_path="")

CORS(app, support_credentials=True)

app.secret_key = "testing"

os.environ["KAGGLE_USERNAME"] = "jeffreyzhanguta"
os.environ["KAGGLE_KEY"] = "9113e9b5bc1b5c9e016fdc711e2d6460"

from kaggle.api.kaggle_api_extended import KaggleApi

api = KaggleApi()
api.authenticate()


# comment on deployment
# CORS(app)
# connection to mongoDB client
Client = MongoClient(
    "mongodb+srv://runtimeTerror:runtimeTerror1234@cluster0.egyl2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    tlsCAFile=ca,
)
# database that is being interacted with
dbname = Client.get_database("EE461L_Project")
# collection that is being interacted with
users = dbname.get_collection("Users")
collection_Projects = dbname["Projects"]
print(users)


@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return send_from_directory(app.static_folder, "index.html")


memoizedDataResponse = None
@app.route("/DataSetMetadata")
@cross_origin(supports_credentials=True)
def returnMetadata():
    global memoizedDataResponse
    if memoizedDataResponse != None:
        return memoizedDataResponse

    data = {}
    list1 = api.dataset_list()
    for i in range(5):
        dataset = list1[i]
        data[str(i)] = {}
        data[str(i)]["name"] = str(dataset).split("/")[-1]
        data[str(i)]["filesize"] = str(dataset.size)
        data[str(i)]["tags"] = str(dataset.tags)
        data[str(i)]["download"] = (
            "https://www.kaggle.com/" + str(dataset) + "/download"
        )
    response = flask.jsonify({"Metadata": data})
    print(data)
    print(response)
    memoizedDataResponse = response
    return response


@app.route("/signup", methods=["post"])
@cross_origin(supports_credentials=True)
def signUp():
    # user input of signup page
    info = json.loads(request.data)
    print(info)
    name = info["name"]
    email = info["email"]
    password = pbkdf2_sha256.hash(info["password"])
    # prints all users
    cursor = users.find({})
    for document in cursor:
        print(document)
    # your query
    user = users.find_one({"email": email})
    print(user)
    # printing all users again
    cursor = users.find({})
    for document in cursor:
        print(document)
    # if user already has an account
    if user:
        response = jsonify({"error": "Email address already in use"})
        return response, 409
    # new user creation
    else:
        users.insert_one(
            {
                "name": name,
                "email": email,
                "password": password
                # "hwset1": {"capacity": 100, "availability": 100, "checkedout_qty": 0},
                # "hwset2": {"capacity": 100, "availability": 100, "checkedout_qty": 0},
            }
        )
        session["loggedIn"] = True
        session["user"] = email
        response = jsonify({"email": email})
        return response, 200


@app.route("/signin", methods=["post"])
@cross_origin(supports_credentials=True)
def signIn():
    print(request)
    info = json.loads(request.data)
    print(info)
    email = info["email"]
    password = info["password"]

    user = users.find_one(
        {"email": email},
    )
    # check if username and password are correct, if so login
    if user and pbkdf2_sha256.verify(password, user["password"]):
        session["loggedIn"] = True
        session["user"] = email

        # users_info = users.find({"email": email})
        # for user_info in users_info:
        #     session["hwset1"] = user_info["hwset1"]
        #     session["hwset2"] = user_info["hwset2"]

        print(session["loggedIn"])
        print(session["user"])
        # print(session["hwset1"])
        # print(session["hwset2"])
        response = jsonify({"email": email})
        print(response.headers)
        return response, 200
    # incorrect username or password
    else:
        response = jsonify({"error": "email and/or password are incorrect"})
        print(response.headers)
        return response, 401


@app.route("/signout", methods=["post"])
@cross_origin(supports_credentials=True)
def signOut():
    session["loggedIn"] = False
    session["user"] = 0
    # session["hwset1"] = None
    # session["hwset2"] = None
    return jsonify({"message": "user logged out"}), 200


@app.route("/test", methods=["post"])
@cross_origin(supports_credentials=True)
def test():
    print("doing test")
    print(session)
    # print(session['loggedIn'])
    print(session["user"])
    response = jsonify({"message": "test"})
    return response, 200


@app.route("/create", methods=["POST"])
@cross_origin(supports_credentials=True)
def create():
    req = request.get_json()
    req["hwset1"] = {"capacity": 100, "availability": 100, "checkedout_qty": 0}
    req["hwset2"] = {"capacity": 100, "availability": 100, "checkedout_qty": 0}
    items = collection_Projects.find({"_id": req["_id"]})
    res = {"created": False}
    if len(list(items)) == 0:
        if "loggedIn" in session and session["loggedIn"]:
            req["emails"] = req.setdefault("emails", [])
            req["emails"].append({"email": session["user"]})
            print(req)
        else:
            print("Not Logged")
        collection_Projects.insert_one(req)
        res["created"] = True
    return res


@app.route("/get-projects")
@cross_origin(supports_credentials=True)
def get_projects():
    projects = []
    if "user" in session:
        projects = collection_Projects.find(
            {"emails": {"$elemMatch": {"email": session["user"]}}}
        )
    return {"list": list(projects)}


@app.route("/join", methods=["POST"])
@cross_origin(supports_credentials=True)
def join():
    req = request.get_json()
    project = {}
    items = collection_Projects.find({"_id": req["_id"]})
    res = {"joined": False}
    for item in items:
        project = item
        if {"email": session["user"]} in project.get("emails", []):
            return res
        project["emails"] = project.setdefault("emails", [])
        project["emails"].append({"email": session["user"]})
        collection_Projects.replace_one({"_id": req["_id"]}, project)
        res["joined"] = True
    return res


@app.route("/get-project", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_project():
    req = request.get_json()
    items = collection_Projects.find({"_id": req["_id"]})
    for item in items:
        return item


@app.route("/checkout", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkout():
    req = request.get_json()
    print(req)
    name = req["name"]
    res = {"hwset1error": False, "hwset2error": False}
    items = collection_Projects.find({"_id": req["_id"]})
    for item in items:
        res["hwset1"], res["hwset2"] = item["hwset1"], item["hwset2"]
        if "Hardware Set 1" in name:
            hwset1 = hardwareSet.HWSet(item["hwset1"])
            if(hwset1.check_out(int(req["number"]))==0):
                res["hwset1error"] = False
            else:
                res["hwset1error"] = True
            collection_Projects.update_one({"_id": req["_id"]}, {"$set": {"hwset1": hwset1.jsonify()}})
            res["hwset1"] = hwset1.jsonify()
            
        if "Hardware Set 2" in name:
            hwset2 = hardwareSet.HWSet(item["hwset2"])
            if(hwset2.check_out(int(req["number"]))==0):
                res["hwset2error"] = False
            else:
                res["hwset2error"] = True
            collection_Projects.update_one({"_id": req["_id"]}, {"$set": {"hwset2": hwset2.jsonify()}})
            res["hwset2"] = hwset2.jsonify()

    return res


@app.route("/checkin", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkin():
    req = request.get_json()
    name = req["name"]
    res = {"hwset1error": False, "hwset2error": False}
    items = collection_Projects.find({"_id": req["_id"]})
    for item in items:
        res["hwset1"], res["hwset2"] = item["hwset1"], item["hwset2"]
        if "Hardware Set 1" in name:
            hwset1 = hardwareSet.HWSet(item["hwset1"])
            if(hwset1.check_in(int(req["number"]))==0):
                res["hwset1error"] = False
            else:
                res["hwset1error"] = True
            collection_Projects.update_one({"_id": req["_id"]}, {"$set": {"hwset1": hwset1.jsonify()}})
            res["hwset1"] = hwset1.jsonify()
        if "Hardware Set 2" in name:
            hwset2 = hardwareSet.HWSet(item["hwset2"])
            if(hwset2.check_in(int(req["number"]))==0):
                res["hwset2error"] = False
            else:
                res["hwset2error"] = True
            collection_Projects.update_one({"_id": req["_id"]}, {"$set": {"hwset2": hwset2.jsonify()}})
            res["hwset2"] = hwset2.jsonify()

    return res


if __name__ == "__main__":
    app.run(debug=True)
    # app.run(host="0.0.0.0", debug=True, port=os.environ.get("PORT", 80))
