from flask import Blueprint
from flask import request, jsonify
from flask_jwt_extended import create_access_token
import datetime

def get_auth_blueprint(db, User, bcrypt, jwt):

    auth_blueprint = Blueprint('auth' , __name__)

    @auth_blueprint.route('/signup', methods=['POST'])
    def signup():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'User already exists'}), 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, password=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    @auth_blueprint.route('/login', methods=['POST'])
    def login():
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({'message': 'Invalid credentials'}), 401

        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=1))
        return jsonify({'access_token': access_token}), 200

    return auth_blueprint