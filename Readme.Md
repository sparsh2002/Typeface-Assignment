# DropBox like APP

## The goal of the project is to implement a simplified Dropbox like Product, where users can upload and download files through a Web Application.  


#### Demo link : https://drive.google.com/drive/folders/1RSbrnHoTsHZBP0TGl_zG-lnZgRwXxwbA?usp=sharing

## Backend Tech Used:
1. flask
2. AWS


## Frontend Tech Used:
1. React
2. Bootstrap
3. MaterialUI

### Steps to run Backend

1. Switch to backend repo
2. Create virtual environment : python3 -m venv .venv 
3. Activatte virtual environment: source .venv/bin/activate
3. Run : pip install -r requirements.txt
4. Place the Environment file in .env file
5. Configure AWS S3 and create a bucket and get access key and secret and place in .env file
6. Setup postgres to use as backend
7. Run : python3 app.py

### Steps to run frontend
1. Switch to frontend repo
2. Install dependencies: npm install
3. Start: npm start