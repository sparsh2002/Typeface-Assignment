from flask import request
from util.logger import logger, log_function_params
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity

# @jwt_required()
def get_users(User):
    logger.info('get_users:init')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    users_paginated = User.query.paginate(page=page, per_page=per_page)
    logger.info(users_paginated)
    users = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users_paginated.items]
    logger.info(users)
    return {
        'users': users,
        'total': users_paginated.total,
        'pages': users_paginated.pages,
        'current_page': users_paginated.page,
    }


def get_user_profile(User, user_id):
    user = User.query.filter_by(id=user_id).first()

    if not user:
        logger.warning(f"User with id {user_id} not found.")
        return None
    return  {
        'id': user.id,
        'username': user.username,
        'email': user.email,
    }
    