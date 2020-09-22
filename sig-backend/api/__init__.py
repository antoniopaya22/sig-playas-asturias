from flask import Flask
from .config import get_mode
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(mode):
    """Construct the core application."""
    app = Flask(__name__)
    app.config.from_object(get_mode(mode))
    db.init_app(app)

    app.app_context().push()
    # Import beaches to DB
    from .load import load_geojson
    load_geojson()
    # Imports Routes
    from .routes import beach_routes
    from .routes import occupation_routes

    # Create tables for models
    db.create_all()

    return app
