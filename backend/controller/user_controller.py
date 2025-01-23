from flask import Blueprint
from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from service.user_service import get_users, get_user_profile , get_user_files, upload_file_to_user_space
from util.logger import logger

def get_user_blueprint(User , File ,db, s3_client ,jwt):
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
    
    @user_blueprint.route('/<int:user_id>/files', methods=['GET', 'POST'])
    def manage_files_controller(user_id):
        current_user = get_jwt_identity()
        logger.info(current_user)
        logger.info(user_id)
        logger.info(type(current_user))
        logger.info(type(user_id))
        if current_user != str(user_id):
            return jsonify({'message': 'Unauthorized'}), 403
        if request.method=='GET':
            try:
                response = get_user_files(User , File ,s3_client, db, user_id)
                return jsonify(response) , 200
            except Exception as e:
                return jsonify({"error": "some error occured file fetching files"}) , 500
        
        try:
            response = upload_file_to_user_space(User , File ,s3_client, db , user_id)
            return jsonify(response) , 200
        except Exception as e:
            return jsonify({"error": "some error occured file uploading file"}) , 500

    return user_blueprint