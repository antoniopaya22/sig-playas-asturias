import requests
import datetime as dt

from api.repository.beach_repository import BeachRepository


class BeachController:

    @staticmethod
    def get_all_beaches():
        beaches = BeachRepository.get_all_beaches()
        return [x.to_json() for x in beaches]

    @staticmethod
    def get_beach_by_id(id):
        beach = BeachRepository.get_beach_by_id(id)
        return beach.to_json()

    @staticmethod
    def search_beach(request):
        tim_max = float(request.json['minutes'])
        beaches = BeachRepository.get_all_beaches()
        filtered = []
        for beach in beaches:
            dist = calcular_distancia(request.json['latitud'], request.json['longitud'], beach.latitud, beach.longitud)
            if (tim_max * 60) > dist:
                filtered.append(beach)
        return [x.to_json() for x in filtered]


def calcular_distancia(lat, long, end_lat, end_long):
    api_key = "AIzaSyCwYm3CgrdQQM_abaP45IH0OpCovrwyPQs"
    source = str(lat) + "," + str(long)
    dest = str(end_lat) + "," + str(end_long)
    try:
        # url variable store url
        url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
        r = requests.get(url + 'origins=' + source +
                         '&destinations=' + dest +
                         '&key=' + api_key +
                         '&language=es')

        # json method of response object
        # return json format result
        x = r.json()

        # bydefault driving mode considered

        # print the vale of x
        return dt.timedelta(seconds=x['rows'][0]['elements'][0]['duration']['value']).total_seconds()
    except:
        return -1
