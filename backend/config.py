# Import necessary modules
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Create Flask application instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Configure the database URI and disable track modifications
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase1.db" # "mydatabase1.db can be changed to whatever you like as long as it ends in .db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create SQLAlchemy database instance
db = SQLAlchemy(app)
