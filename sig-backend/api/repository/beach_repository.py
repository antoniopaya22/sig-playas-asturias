from api.models.beach import Beach
from api import db


class BeachRepository:

    @staticmethod
    def get_all_beaches():
        try:
            return Beach.query.all()
        except:
            return []

    @staticmethod
    def add_beach(beach):
        try:
            db.session.add(beach)
            db.session.commit()
        except:
            return False
        return True

    @staticmethod
    def delete_beach(id):
        try:
            Beach.query.filter_by(id=id).delete()
            db.session.commit()
        except:
            return False
        return True

    @staticmethod
    def cambiar_ocupacion_actual(id, ocupacion):
        try:
            beach = Beach.query.get(id)
            beach.ocupacion_actual = ocupacion
            db.session.commit()
        except:
            return False
        return True

    @staticmethod
    def get_beach_by_playa_id(playa_id):
        try:
            return Beach.query.filter_by(playa_id=playa_id).one()
        except:
            return None

    @staticmethod
    def get_beach_by_id(id):
        try:
            return Beach.query.get(id)
        except:
            return None

    @staticmethod
    def cambiar_ocupacion_actual(id, ocupacion):
        try:
            beach = Beach.query.get(id)
            beach.ocupacion_actual = ocupacion
            db.session.commit()
        except:
            return False
        return True