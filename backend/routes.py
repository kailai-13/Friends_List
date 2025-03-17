from model import Friends
from flask import request, jsonify
from app import app,db

@app.route('/friends',methods=["GET"])
def get_all_friends():


    friends = Friends.query.all()
    friends_json=[friend.to_json() for friend in friends]
    return jsonify(friends_json)

@app.route('/add_friends',methods=["POST"])
def add_friends():

    try:


        data=request.json
        required_fields = ['name', 'role', 'description', 'gender']
        
        # Check for missing fields

        for field in required_fields:
            if field not in data or not isinstance(data[field], str) or not data[field].strip():
                return jsonify({'error': f'{field} field is missing or empty'}), 400
            

        name=data.get('name')
        role=data.get('role')
        description=data.get('description')
        gender=data.get('gender')

        if gender == 'male':
            img_url=f'https://avatar.iran.liara.run/public/boy?username={name}'
        elif gender == 'female':
            img_url=f'https://avatar.iran.liara.run/public/girl?username={name}'
        else:
            img_url=None


        new_friends=Friends(name=name,role=role,description=description,gender=gender,img_url=img_url)
        db.session.add(new_friends)
        db.session.commit()
        return jsonify({'message':'added successfully'}),201
    
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':str(e)}),500
    
@app.route('/delete_friends/<int:id>',methods=["DELETE"])
def delete(id):
    try:
        fri=Friends.query.get(id)
        if not fri:
            return jsonify({'error':'No Such Friend'}),404
        db.session.delete(fri)
        db.session.commit()
        return jsonify({'message':'deleted successfully'}),200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':str(e)})