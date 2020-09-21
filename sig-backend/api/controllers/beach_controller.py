from api.repository.beach_repository import BeachRepository


class BeachController:

    @staticmethod
    def get_all_beaches():
        beaches = BeachRepository.get_all_beaches()
        return [x.to_json() for x in beaches]

    @staticmethod
    def get_beach_by_id(id):
        beach = BeachRepository.get_beach_by_id(id)
        return beach

    @staticmethod
    def search_beach(body):
        beaches = [x for x in BeachRepository.get_all_beaches() if
                   comparar(x.accesos, body.accesos) and
                   comparar(x.material, body.material) and
                   comparar(x.concejo, body.concejo) and
                   comparar(x.longitud, body.longitud) and
                   comparar(x.salvamento, body.salvamento)
                   ]
        return beaches


def comparar(att, value):
    if att is None or att == "":
        return True
    elif att == value:
        return True
    else:
        return False
