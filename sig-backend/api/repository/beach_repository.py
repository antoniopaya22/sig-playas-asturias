from api.models.beach import Beach
from api import db


class BeachRepository:

    @staticmethod
    def get_all_beaches():
        try:
            return Beach.query.all()
        except:
            return []


