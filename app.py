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
collection_HardwareSets = dbname["HardwareSets"]

print("Users are: ", users)
print("Projects are: ", collection_Projects)
print("HW sets are: ", collection_HardwareSets)


hardwareSets = collection_HardwareSets.find()
hwset1, hwset2 = None, None
for hardware in hardwareSets:
    if hardware["_id"] == "hwset1":
        hwset1 = hardwareSet.HWSet(hardware)
    elif hardware["_id"] == "hwset2":
        hwset2 = hardwareSet.HWSet(hardware)
print(hwset1)
print(hwset2)

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
    print("The Request for Sign Up is ", info)
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
            }
        )
        session["loggedIn"] = True
        session["user"] = email
        response = jsonify({"email": email})
        return response, 200


@app.route("/signin", methods=["post"])
@cross_origin(supports_credentials=True)
def signIn():
    info = json.loads(request.data)
    print("request for sign In is ", info)
    email = info["email"]
    password = info["password"]

    user = users.find_one(
        {"email": email},
    )
    # check if username and password are correct, if so login
    if user and pbkdf2_sha256.verify(password, user["password"]):
        session["loggedIn"] = True
        session["user"] = email

        print(session["loggedIn"])
        print(session["user"])
        response = jsonify({"email": email})
        print("The response is ", response)
        return response, 200
    # incorrect username or password
    else:
        response = jsonify({"error": "email and/or password are incorrect"})
        print("The response is ", response)
        return response, 401


@app.route("/signout", methods=["post"])
@cross_origin(supports_credentials=True)
def signOut():
    session["loggedIn"] = False
    session["user"] = 0
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
    print("The Request for create is ", req)
    items = collection_Projects.find({"_id": req["_id"]})
    listItems = list(items)
    print("The query returned ", listItems)
    res = {"created": False, "reason": ""}
    if not ("loggedIn" in session and session["loggedIn"]):
        res["reason"] = "You cannot create a Project if you are not signed in"
    elif len(listItems) == 0:
        hwset1.init_project(req["_id"])
        hwset2.init_project(req["_id"])
        print(hwset1)
        print(hwset2)
        print("initializing checked out to zero")
        collection_HardwareSets.replace_one({"_id": "hwset2"}, hwset2.jsonify())
        collection_HardwareSets.replace_one({"_id": "hwset1"}, hwset1.jsonify())
        req["emails"] = req.setdefault("emails", [])
        req["emails"].append({"email": session["user"]})
        collection_Projects.insert_one(req)
        res["created"] = True
    else:
        res["reason"] = "A Project with that ID has already been created, please choose another one"
    print("The response is ", res)
    return res


@app.route("/get-projects")
@cross_origin(supports_credentials=True)
def get_projects():
    projects = []
    if "user" in session:
        projects = collection_Projects.find(
            {"emails": {"$elemMatch": {"email": session["user"]}}}
        )
    return jsonify({"list": list(projects)})


@app.route("/join", methods=["POST"])
@cross_origin(supports_credentials=True)
def join():
    req = request.get_json()
    project = {}
    items = collection_Projects.find({"_id": req["_id"]})
    listItems = list(items)
    res = {"joined": False, "reason": ""}

    if not ("loggedIn" in session and session["loggedIn"]):
        res["reason"] = "You cannot join a Project if you are not signed in"

    elif len(listItems) == 0:
        res["reason"] = "You cannot join this Project because a Project with this ID doesnt exist"

    else:
        for item in listItems:
            project = item
            if {"email": session["user"]} in project.get("emails", []):
                return res
            project["emails"] = project.setdefault("emails", [])
            project["emails"].append({"email": session["user"]})
            collection_Projects.replace_one({"_id": req["_id"]}, project)
            res["joined"] = True
            res["reason"] = "You have successfully joined the Project"
    return res


@app.route("/get-project-sets", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_project():

    req = request.get_json()
    print("This is the request", req)
    projID = req["_id"]
    items = collection_Projects.find({"_id": projID})
    name= ""
    description = ""
    for item in items:
        name = item["projName"]
        description = item["projDescrip"]

    res = {
            "hw1_info": {

               "availability": hwset1.get_availability(),
               "capacity": hwset1.get_capacity(),
               "checkedout_qty": hwset1.get_checkedout_qty(projID),

            },
            "hw2_info": {
                "availability": hwset2.get_availability(),
                "capacity": hwset2.get_capacity(),
                "checkedout_qty": hwset2.get_checkedout_qty(projID),
            },
            "proj_info": {
                "name": name,
                "description": description


            }


    }
    print("This is the response", res)
    return jsonify(res)


@app.route("/checkout", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkout():
    req = request.get_json()
    print("This is the checkout request", req)
    print("This is HW 1")
    print(hwset1)
    print("This is HW 2")
    print(hwset2)


    projID= req["_id"]

    quantity = int(req.get("number"))
    print(req)

    if(req["name"] == "Hardware Set 1"):
        orig_availability = hwset1.get_availability()
        orig_capacity = hwset1.get_capacity()
        orig_checked_out = hwset1.get_checkedout_qty(projID)
    else:
        orig_availability = hwset2.get_availability()
        orig_capacity = hwset2.get_capacity()
        orig_checked_out = hwset2.get_checkedout_qty(projID)

    res = {"error": False,
           "info": {
               "availability": orig_availability,
               "capacity": orig_capacity,
               "checkedout_qty": orig_checked_out,
           },
           "set_name": req["name"]
    }

    if "Hardware Set 1" in req["name"]:
        if hwset1.check_out(quantity, projID) == 0:
            res["error"] = False
        else:
            res["error"] = True
        collection_HardwareSets.replace_one({"_id": "hwset1"}, hwset1.jsonify())
        res["info"]["availability"] = hwset1.get_availability()
        res["info"]["capacity"] = hwset1.get_capacity()
        res["info"]["checkedout_qty"] = hwset1.get_checkedout_qty(projID)

    if "Hardware Set 2" in req["name"]:
        if hwset2.check_out(quantity, projID) == 0:
            res["error"] = False
        else:
            res["error"] = True
        collection_HardwareSets.replace_one({"_id": "hwset2"}, hwset2.jsonify())
        res["info"]["availability"] = hwset1.get_availability()
        res["info"]["capacity"] = hwset1.get_capacity()
        res["info"]["checkedout_qty"] = hwset1.get_checkedout_qty(projID)

    print("This is the response")
    return jsonify(res)


@app.route("/checkin", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkin():
    req = request.get_json()
    print("This is the req", req)
    print("This is HW 1")
    print(hwset1)
    print("This is HW 2")
    print(hwset2)
    projID = req["_id"]
    quantity = int(req.get("number"))

    if(req["name"] == "Hardware Set 1"):
        orig_availability = hwset1.get_availability()
        orig_capacity = hwset1.get_capacity()
        orig_checked_out = hwset1.get_checkedout_qty(projID)
    else:
        orig_availability = hwset2.get_availability()
        orig_capacity = hwset2.get_capacity()
        orig_checked_out = hwset2.get_checkedout_qty(projID)

    res = {"error": False,
           "info": {
               "availability": orig_availability,
               "capacity": orig_capacity,
               "checkedout_qty": orig_checked_out,
           },
           "set_name": req["name"]
    }

    if "Hardware Set 1" in req["name"]:
        if hwset1.check_in(quantity, projID) == 0:
            res["error"] = False
        else:
            res["error"] = True
        collection_HardwareSets.replace_one({"_id": "hwset1"}, hwset1.jsonify())
        res["info"]["availability"] = hwset1.get_availability()
        res["info"]["capacity"] = hwset1.get_capacity()
        res["info"]["checkedout_qty"] = hwset1.get_checkedout_qty(projID)

    if "Hardware Set 2" in req["name"]:
        if hwset2.check_in(quantity, projID) == 0:
            res["error"] = False
        else:
            res["error"] = True
        collection_HardwareSets.replace_one({"_id": "hwset2"}, hwset2.jsonify())
        res["info"]["availability"] = hwset1.get_availability()
        res["info"]["capacity"] = hwset1.get_capacity()
        res["info"]["checkedout_qty"] = hwset1.get_checkedout_qty(projID)

    print("This is the response")
    return jsonify(res)


if __name__ == "__main__":
    app.run()
    # app.run(host="0.0.0.0", debug=True, port=os.environ.get("PORT", 80))