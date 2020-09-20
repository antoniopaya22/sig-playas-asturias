from api import db


class Beach(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.username,
        }

    def __repr__(self):
        return '<Beach {}>'.format(self.name)
