from api.repository.occupation_repository import OccupationRepository


class OccupationController:

    @staticmethod
    def get_all_occupationes():
        occupationes = OccupationRepository.get_all_ocupationes()
        return [x.to_json() for x in occupationes]

    @staticmethod
    def get_occupation_by_id(id):
        occupation = OccupationRepository.get_occupation_by_id(id)
        return occupation

    @staticmethod
    def get_occupation_by_playa_id(id):
        occupation = OccupationRepository.get_occupations_by_playa_id(id)
        return occupation
