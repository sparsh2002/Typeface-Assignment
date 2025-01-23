import boto3
from dotenv import load_dotenv
import os
from util.logger import logger
load_dotenv()


def get_s3_client():
    client = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
        aws_secret_access_key=os.getenv('AWS_ACCESS_SECRET'),
    )
    return client