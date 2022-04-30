"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify, request
from music_recomm import app
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask import request
from pymongo import MongoClient
from bson.json_util import dumps
import json

client = MongoClient('mongodb+srv://admin:admin123@cluster0.7qxt2.mongodb.net/musicfy?retryWrites=true&w=majority')
db = client.ContactDB


# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/muscify'
# db = SQLAlchemy(app)


api = Api(app)
CORS(app)
class Hello(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):
  
        return jsonify({'message': 'hello world'})
  
    # Corresponds to POST request
    def post(self):
          
        data = request.get_json()     # status code
        return jsonify({'data': data}), 201

api.add_resource(Hello, '/')

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route("/register", methods = ['POST'])
def add_user():
    try:
        data = json.loads(request.data)
        print(request.data)
        username = data['username']
        email = data['email']
        password = data['password']
        status = db.Users.insert_one({
            "name" : username,
            "email" : email,
            "password":password,
            })
        return dumps({'message' : 'SUCCESS'})
    except Exception as e:
        return dumps({'error' : str(e)})


