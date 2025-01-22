from flask import Blueprint
from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from service.user_service import get_users
from util.logger import logger

def get_user_blueprint(User, jwt):
    user_blueprint = Blueprint('user' , __name__)
    
    @user_blueprint.route("/", methods=['GET'])
    def get_users_controller():
        logger.info('get_users_controller:init')
        return get_users(User)

    return user_blueprint