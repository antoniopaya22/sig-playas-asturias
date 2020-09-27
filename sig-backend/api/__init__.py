from flask import Flask
from .config import get_mode
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app(mode):
    """Construct the core application."""
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(get_mode(mode))
    db.init_app(app)

    app.app_context().push()

    # Imports Routes
    from .routes import beach_routes
    from .routes import occupation_routes

    # Create tables for models
    db.create_all()

    # Import beaches to DB
    from api.data.load_beaches import load_geojson
    load_geojson()
    # Load every 100 seconds occupations on DB
    from api.data.load_occupations import load_occupations
    load_occupations(app)

    return app
