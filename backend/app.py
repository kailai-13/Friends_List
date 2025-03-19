from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from flask import request, jsonify


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

db = SQLAlchemy(app)
class Friends(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(200), nullable=False)
    role=db.Column(db.String(50), nullable=False)
    description=db.Column(db.Text, nullable=False)
    gender=db.Column(db.String(10),nullable=False)
    img_url=db.Column(db.String(2000),nullable=True)

    def to_json(self):
        return {
            'id':self.id,
            'name':self.name,
            'role':self.role,
            'description':self.description,
            'gender':self.gender,
            'imgUrl':self.img_url
        }

with app.app_context():
    db.create_all()


@app.route('/friends',methods=["GET"])
def get_all_friends():


    friends = Friends.query.all()
    friends_json=[friend.to_json() for friend in friends]
    return jsonify(friends_json),200

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
    
@app.route('/update_friends/<int:id>',methods=["PUT"])
def update(id):
    try:
        fri=Friends.query.get(id)
        if not fri:
            return jsonify({'error':'No Such Friend'}),404
        data=request.json
        fri.name=data.get("name",fri.name)
        fri.role=data.get("role",fri.role) 
        fri.description=data.get("description",fri.description)
        fri.gender=data.get("gender",fri.gender)
        db.session.commit()
        return jsonify({'message':'updated successfully'}),200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':str(e)}),500


if __name__ == '__main__':
    app.run(debug=True)