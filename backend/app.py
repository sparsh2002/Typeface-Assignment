from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import boto3
import datetime
import os
from io import BytesIO

app = Flask(__name__)
CORS(app)



if __name__ == '__main__':
    app.run(debug=True)
