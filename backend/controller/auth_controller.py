from flask import Blueprint
from flask import request, jsonify

from service.auth_service import signup, login

def get_auth_blueprint(db, User, bcrypt, jwt):

    auth_blueprint = Blueprint('auth' , __name__)

    @auth_blueprint.route('/signup', methods=['POST'])
    def signup_controller():
        return signup(db, User, bcrypt)

    @auth_blueprint.route('/login', methods=['POST'])
    def login_controller():
        return login(User, bcrypt)

    return auth_blueprint