from flask_sqlalchemy import SQLAlchemy


def db_connect(app):
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sparsh:sparsh3435@localhost/typeface'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'mysecretkey'

    db = SQLAlchemy(app)

    return db