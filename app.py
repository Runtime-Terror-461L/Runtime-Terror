from flask import Flask, send_from_directory, jsonify, request, session
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256
from flask_cors import CORS #comment this on deployment
import os
import json
# from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
app.secret_key = "testing"

os.environ['KAGGLE_USERNAME'] = 'jeffreyzhanguta'
os.environ['KAGGLE_KEY'] = '9113e9b5bc1b5c9e016fdc711e2d6460'

from kaggle.api.kaggle_api_extended import KaggleApi
api = KaggleApi()
api.authenticate()


#comment on deployment
CORS(app)
# connection to mongoDB client
Client = MongoClient(
    "mongodb+srv://gameobob:eyob354246@cluster0.kmqbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# database that is being interacted with
dbname = Client.get_database("EE461L_Project")
# collection that is being interacted with
users = dbname.get_collection("Users")

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

memoizedDataResponse = None
@app.route('/DataSetMetadata')
def returnMetadata():
    global memoizedDataResponse
    if(memoizedDataResponse != None):
        return memoizedDataResponse

    data = {}
    list1 = api.dataset_list()
    for i in range(5):
        dataset = list1[i]
        data[str(i)] = {}
        data[str(i)]["name"] = str(dataset).split("/")[-1]
        data[str(i)]["filesize"] = str(dataset.size)
        data[str(i)]["tags"] = str(dataset.tags)
        data[str(i)]["download"] = "https://www.kaggle.com/"+str(dataset)+"/download"
    response = flask.jsonify({'Metadata': data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(data)
    print(response)
    memoizedDataResponse = response
    return response



@app.route('/signup', methods=['post'])
def signUp():
    # user input of signup page
    info = json.loads(request.data)
    name = info['name']
    email = info['email']
    password = pbkdf2_sha256.hash(info['password'])
    user = users.find_one({}, {'email': email})
    # if user already has an account
    if user:
        return jsonify({'error': 'Email address already in use'}), 409
    # new user creation
    else:
        users.insert_one(
            {
                "name": name,
                "email": email,
                "password": password
            })
        session['loggedIn'] = True
        session['user'] = email
        return jsonify({"email": email}), 200


@app.route('/signin', methods=['post'])
def signIn():
    info = json.loads(request.data)
    email = info['email']
    password = info['password']
    user = users.find_one({'email': email}, )
    # check if username and password are correct, if so login
    if user and pbkdf2_sha256.verify(password, user['password']):
        session['loggedIn'] = True
        session['user'] = email
        return jsonify({"email": email}), 200
    # incorrect username or password
    else:
        return jsonify({'error': 'email and/or password are incorrect'}), 401

@app.route('/signout', methods=['post'])
def signOut():
    session['loggedIn'] = False
    session['user'] = 0
    return jsonify({'message': 'user logged out'}), 200


if __name__ == "__main__":
    app.run(debug=True)
