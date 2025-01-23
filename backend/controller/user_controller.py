from flask import Blueprint
from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from service.user_service import get_users, get_user_profile
from util.logger import logger

def get_user_blueprint(User, jwt):
    user_blueprint = Blueprint('user' , __name__)

    @user_blueprint.before_request
    @jwt_required()
    def require_jwt():
        logger.info(f"Authenticated user: {get_jwt_identity()}")
    
    @user_blueprint.route("/", methods=['GET'])
    def get_users_controller():
        logger.info('get_users_controller:init')
        return get_users(User)
    

    @user_blueprint.route("/<int:user_id>/profile", methods=['GET'])
    def get_user_profile_controller(user_id):
        response = get_user_profile(User, user_id)

        if response is None:
            return jsonify({'message': 'Error fetching user profile'}), 500
        
        return jsonify(response), 200

    return user_blueprint