"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, jsonify, request
from music_recomm import app
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/muscify'
db = SQLAlchemy(app)


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

class Users(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


@app.route('/register', methods=["POST"])
def register():
     input_json = request.get_json(force=True) 
     dictToReturn = {'username':input_json['username'],'email':input_json['email'],'password':input_json['password']}
     entry = Users(username=input_json['username'],email=input_json['email'],password=input_json['password'],)
     db.session.add(entry)
     db.session.commit()
     return jsonify(dictToReturn)
