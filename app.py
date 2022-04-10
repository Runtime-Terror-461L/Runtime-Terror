import json
from flask import Flask, send_from_directory, jsonify, request, session#, redirect
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
app.secret_key = "testing"

# connection to mongoDB client
Client = MongoClient(
    "mongodb+srv://asamant:jgaP0PINkADCHqRX@cluster0.oovet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# database that is being interacted with
dbname = Client.get_database("EE461L Project")
# collection that is being interacted with
users = dbname.get_collection("Users")


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


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
                "password": password,
            })
        session['loggedIn'] = True
        session['user'] = email
        return jsonify(user), 200


@app.route('/signin', methods=['post'])
def signIn():
    info = json.loads(request.data)
    email = info['email']
    password = info['password']
    user = users.find_one({}, {'email': email, 'password': password})
    # check if username and password are correct, if so login
    if user and pbkdf2_sha256.verify(info['password'], user['password']):
        session['loggedIn'] = True
        session['user'] = email
        return jsonify(user), 200
    # incorrect username or password
    else:
        return jsonify({'error': 'email and/or password are incorrect'}), 401

@app.route('/signout', methods=['post'])
def signOut():
    session['loggedIn'] = False
    session['user'] = 0
    return jsonify({'error': 'email and/or password are incorrect'}), 401


if __name__ == "__main__":
    app.run(debug=True)
