from flask import Flask, request, jsonify, send_file
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS

import boto3

import os
from io import BytesIO
from database.connection import db_connect

from controller.auth_blueprint import get_auth_blueprint

from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
CORS(app)


jwt = JWTManager(app)
bcrypt = Bcrypt(app)


db = db_connect(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Dropbox app'}), 200


app.register_blueprint(get_auth_blueprint(db, User, bcrypt, jwt) , url_prefix="/api/auth")


if __name__ == '__main__':
    app.run(host="localhost", port=os.getenv('PORT') ,debug=True)
