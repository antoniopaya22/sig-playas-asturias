from api import db


class Occupation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playa_id = db.Column(db.String(64))
    timestamp = db.Column(db.String(64))
    occupacion = db.Column(db.Integer)

    def to_json(self):
        return {
            "id": self.id,
            "play_id": self.playa_id,
            "timestamp": self.timestamp,
            "occupacion": self.occupacion
        }

    def __repr__(self):
        return '<Ocupation {}>'.format(self.id)