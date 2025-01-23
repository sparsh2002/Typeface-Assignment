from flask import request
from util.logger import logger, log_function_params
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from util.constants import allowed_file
import os
from dotenv import load_dotenv
from util.logger import logger, log_function_params
from botocore.exceptions import NoCredentialsError

load_dotenv()


S3_BUCKET=os.getenv('S3_BUCKET')


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
    

def get_user_files(User , File ,s3_client, db, user_id):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    files_paginated = File.query.filter_by(user_id=user_id).paginate(page=page, per_page=per_page)

    files = [{'id': file.id, 'file_name': file.file_name, 's3_key': file.s3_key} for file in files_paginated.items]
    return {
        'files': files,
        'total': files_paginated.total,
        'pages': files_paginated.pages,
        'current_page': files_paginated.page,
    }

@log_function_params(
        skip=['User', 'File' , 's3_client', 'db']
        # skip=[]
)
def upload_file_to_user_space(User, File ,s3_client, db , user_id):
    logger.info(f'upload_file_to_user_space:init')
    file = request.files['file']
    # logger.info(file)
    if not file or not allowed_file(file.filename):
        logger.error('Invalid file format!')
        return {'message': 'Invalid file format'}

    s3_key = f"{user_id}/{file.filename}"
    logger.info(s3_key)
    logger.info(S3_BUCKET)
    try:
        response=s3_client.upload_fileobj(
            file, 
            S3_BUCKET, 
            s3_key
            )
        logger.info(response)
    except Exception as e:
        logger.error("Some error occured with S3 bucket")
        return None

    new_file = File(user_id=user_id, file_name=file.filename, s3_key=s3_key)
    db.session.add(new_file)
    db.session.commit()

    return {
        "user_id":user_id,
        "file_name":file.filename,
        "s3_key":s3_key
    }

@log_function_params(skip=['Files', 's3_client'])
def generate_presigned_url(Files, s3_client, object_id):
    file=  Files.query.filter_by(id=object_id).first()
    logger.info(file)
    s3_key= file.s3_key
    logger.info(s3_key)
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={
                                                        'Bucket': S3_BUCKET,
                                                        'Key': s3_key
                                                    },
                                                    ExpiresIn=360000)
        logger.info(response)
        return  { "url": response}
    except NoCredentialsError:
        print("Error: AWS credentials not found.")
    except Exception as e:
        print(f"Error generating presigned URL: {e}")

    return None
