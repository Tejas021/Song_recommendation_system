"""
Routes and views for the flask application.
"""


from datetime import datetime
from flask import Response, render_template, jsonify, request
from music_recomm import app
from flask_cors import CORS
from flask_restful import Resource, Api
import joblib
from bson.objectid import ObjectId
from flask import request
from pymongo import MongoClient
from bson.json_util import dumps
import json
from werkzeug.security import generate_password_hash,check_password_hash

client = MongoClient('mongodb+srv://admin:admin123@cluster0.7qxt2.mongodb.net/musicfy?retryWrites=true&w=majority')
db = client.ContactDB

pr = joblib.load("./music_recomm/IndividualUser.pkl")



api = Api(app)
CORS(app)


@app.route('/')
def home():
    """Renders the home page."""
    return "home"
    


@app.route("/register", methods = ['POST'])
def add_user():
    try:
        data = json.loads(request.data)
       # print(request.data)
        username = data['username']
        email = data['email']
        password = data['password']
        if username and email and password and request.method == 'POST':
            checkEmail = db.Users.find_one({'email':email})
            if checkEmail :
                return dumps('email already exists')    
            else :
                hashedPassword = generate_password_hash(password)
                id = db.Users.insert_one({
                "name" : username,
                "email" : email,
                "password":hashedPassword,
                })
                #print(id.inserted_id)
                return dumps({'user' : {'username':username,"email":email,'id':id.inserted_id,"password":password}})
        else :
            return dumps('please,fill all the details correctly')
    except Exception as e:
        return dumps({'error' : str(e)})


@app.route('/login',methods = ['POST'])
def login():
    try:
        data = json.loads(request.data)
        print(request.data)
        email = data['email']
        password = data['password']
        if email and password and request.method == 'POST':
            checkUser = db.Users.find_one({'email':email})
            print(checkUser)
            # print(checkUser['password'])
            checkPassword = check_password_hash(checkUser['password'],password)
            if checkUser :
                if checkPassword :
                    print('succ')
                    # return dumps({'user' : {'username':checkUser['name'],"email":checkUser['email'],'id':checkUser['_id'],'password':checkUser[password]}})  
                    return dumps({"user":{"username":checkUser['name'],"email":checkUser['email'],'password':password,'id':checkUser['_id'],}})      
                else :
                    return dumps('wrong email or password')   
            else :
                return dumps('wrong email or password')      
        else :
            return dumps('please,fill all the details ')
    except Exception as e:
        return dumps('wrong email or password') 


@app.route('/user/<id>')
def user(id):
    user = db.Users.find_one({'_id':ObjectId(id)})
    resp = dumps(user)
    return resp


@app.route("/song",methods=["POST"])
def song():
    data=json.loads(request.data)
    name1 =data["songname"] + " - " + data["name"]
    recom=pr.get_similar_items([name1])
    print(name1)
    # return "hi"
    return recom.to_json(orient ='records')