from model import Friends
from flask import request, jsonify
from app import app

@app.route('/api',methods=["GET"])
def get_all_friends():
    friends = Friends.query.all()
    friends_json=[friend.to_json() for friend in friends]
    return jsonify(friends_json)