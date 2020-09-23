from api import db


class Beach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playa_id = db.Column(db.String(64), unique=True)
    nombre = db.Column(db.String(64))
    accesos = db.Column(db.String(64))
    camping = db.Column(db.String(64))
    concejo = db.Column(db.String(64))
    foto_tiempo_real = db.Column(db.String(255))
    longitud_playa = db.Column(db.Integer)
    foto_estatica = db.Column(db.String(255))
    material = db.Column(db.String(64))
    salvamento = db.Column(db.String(64))
    nucleo_rural = db.Column(db.String(64))
    nucleo_urbano = db.Column(db.String(64))
    ocupacion_media = db.Column(db.String(64))
    ocupacion_actual = db.Column(db.Float)
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)

    def to_json(self):
        return {
            "id": self.id,
            "play_id": self.playa_id,
            "nombre": self.nombre,
            "accesos": self.accesos,
            "camping": self.camping,
            "concejo": self.concejo,
            "foto_tiempo_real": self.foto_tiempo_real,
            "longitud_playa": self.longitud_playa,
            "foto_estatica": self.foto_estatica,
            "material": self.material,
            "salvamento": self.salvamento,
            "nucleo_rural": self.nucleo_rural,
            "nucleo_urbano": self.nucleo_urbano,
            "ocupacion_media": self.ocupacion_media,
            "ocupacion_actual": self.ocupacion_actual,
            "latitud": self.latitud,
            "longitud": self.longitud
        }

    def __repr__(self):
        return '<Beach {}>'.format(self.nombre)
