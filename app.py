from flask import Flask, send_from_directory
import flask
# from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import os
# from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
os.environ['KAGGLE_USERNAME'] = 'jeffreyzhanguta'
os.environ['KAGGLE_KEY'] = '9113e9b5bc1b5c9e016fdc711e2d6460'

from kaggle.api.kaggle_api_extended import KaggleApi
api = KaggleApi()
api.authenticate()


#comment on deployment
CORS(app)

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



if __name__ == "__main__":
    app.run(debug=True)