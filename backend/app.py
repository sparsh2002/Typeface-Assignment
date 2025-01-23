from flask import Flask, request, jsonify, send_file
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS

import boto3

import os
from io import BytesIO
from database.connection import db_connect

from controller.auth_controller import get_auth_blueprint
from controller.user_controller import get_user_blueprint
from middleware.s3_client import get_s3_client

from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
CORS(app)


jwt = JWTManager(app)
bcrypt = Bcrypt(app)


db = db_connect(app)
s3_client = get_s3_client()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    s3_key = db.Column(db.String(255), nullable=False)


@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Dropbox app'}), 200


app.register_blueprint(get_auth_blueprint(db, User, bcrypt, jwt) , url_prefix="/api/auth")
app.register_blueprint(get_user_blueprint(User , File ,db, s3_client ,jwt) , url_prefix="/api/users")


if __name__ == '__main__':
    app.run(host="localhost", port=os.getenv('PORT') ,debug=True)
