from api.repository.occupation_repository import OccupationRepository


class OccupationController:

    @staticmethod
    def get_all_occupationes():
        occupations = OccupationRepository.get_all_ocupationes()
        return [x.to_json() for x in occupations]

    @staticmethod
    def get_occupation_by_id(id):
        occupation = OccupationRepository.get_occupation_by_id(id)
        return occupation.to_json()

    @staticmethod
    def get_occupation_by_playa_id(id):
        occupations = OccupationRepository.get_occupations_by_playa_id(id)
        return [x.to_json() for x in occupations]
