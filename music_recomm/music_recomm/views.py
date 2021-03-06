"""
Routes and views for the flask application.
"""


# from crypt import methods
from datetime import datetime
# from debugpy import listen
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
import pandas as pd

client = MongoClient('mongodb+srv://admin:admin@cluster0.ovttb.mongodb.net/musicfy?retryWrites=true&w=majority')
db = client.Musicfy

ir = joblib.load("./music_recomm/IndividualUser.pkl")
pr = joblib.load("./music_recomm/PopularityRecommendation.pkl")

songs_data=pd.read_csv("./music_recomm/songs.csv")
print("pop",pr.recommend(songs_data['user_id'][5]))


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
    recom=ir.get_similar_items([name1])
    print(name1)

    # return "hi"
    return recom.to_json(orient ='records')


@app.route("/store",methods=["POST"])
def store():
    data=json.loads(request.data)
    user_id = data['user_id']
    song_id = data['song_id']
    listen_count = data['listen_count']
    id = db.Songs.insert_one({
                "user_id" : user_id,
                "song_id" : song_id,
                "listen_count":listen_count,
                })
    return "hii"



@app.route("/popular-songs",methods=["GET"])
def songs():
    
    recom=pr.recommend(songs_data['user_id'][5])
    
    # return "hi"
    return recom.to_json(orient ='records')