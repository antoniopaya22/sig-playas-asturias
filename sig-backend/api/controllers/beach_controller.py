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
        trying_beaches = []
        dest = ""
        i = 1
        for beach in beaches:
            dest = dest + str(beach.latitud) + "," + str(beach.longitud)+"|"
            trying_beaches.append(beach)
            if i == 23:
                valen = calcular_distancia(request.json['latitud'], request.json['longitud'], dest[:-1], tim_max)
                for playa in valen:
                    filtered.append(trying_beaches[playa])
                i = 0
                trying_beaches = []
                dest = ""
            i = i+1
        return [x.to_json() for x in filtered]


def calcular_distancia(lat, long, dest, tim_max):
    api_key = "AIzaSyCwYm3CgrdQQM_abaP45IH0OpCovrwyPQs"
    source = str(lat) + "," + str(long)
    try:
        # url variable store url
        url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
        r = requests.get(url + 'origins=' + source +
                         '&destinations=' + dest +
                         '&key=' + api_key +
                         '&language=es')

        x = r.json()

        playas = []
        i = 0
        for element in x['rows'][0]['elements']:
            if (tim_max * 60) > dt.timedelta(seconds=element['duration']['value']).total_seconds():
                playas.append(i)
            i = i+1
        return playas
    except Exception as err:
        print(err)
        return []
