import binascii
import hashlib
import os

from flask import abort
from api.models.beach import Beach
from api.repository.beach_repository import BeachRepository
from api.cloud.beach_cloud import BeachCloud



class BeachController:

    @staticmethod
    def get_all_beaches():
        beaches = BeachesRepository.get_all_beaches()
        return [x.to_json() for x in beaches]

    @staticmethod
    def get_occupation():
        beaches = BeachCloud.get_occupation()
        return beaches

    @staticmethod
    def get_all_beaches_from_cloud():
        beaches = BeachCloud.get_all_beaches()
        return beaches
        
