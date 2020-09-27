from api import db


class Occupation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playa_id = db.Column(db.String(64))
    timestamp = db.Column(db.String(64))
    ocupacion = db.Column(db.Float)
    bajamar = db.Column(db.String(64))
    pleamar = db.Column(db.String(64))

    def to_json(self):
        return {
            "id": self.id,
            "playa_id": self.playa_id,
            "timestamp": self.timestamp,
            "ocupacion": self.ocupacion,
            "bajamar": self.bajamar,
            "pleamar": self.pleamar
        }

    def __repr__(self):
        return '<Ocupation {}>'.format(self.playa_id)
