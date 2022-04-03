""" from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

CORS(app_ #comment this on deployment

@app.route('/')

def index():
    return send_from_directory(app.static_folder, 'index.html')


Client.close()


if __name__ == "__main__":
    app.run(debug=True) """