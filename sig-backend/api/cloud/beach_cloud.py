import requests
import json
from pathlib import Path
from bs4 import BeautifulSoup


class BeachCloud:

    @staticmethod
    def get_beaches():
        pass

    @staticmethod
    def get_all_beaches():
        # import kml2geojson kml2geojson.main.convert(
        # 'C:/Users/alba1/Desktop/trabajos/master/segundo/SIG/ProyectoFinal/doc.kml', 'geo.json')
        json_file = Path('geojson/doc.geojson').resolve()
        json_file = open(json_file)
        beaches = json.load(json_file)['features']
        parsed_beaches = []
        for value in beaches:
            new_beach = {'coordenadas': value['geometry']['coordinates']}
            description = value['properties']['description']
            soup = BeautifulSoup(description, features="lxml")
            all_tds = soup.find_all('td')
            properties = {}
            for i in range(2, len(all_tds), 2):
                properties[all_tds[i].string.lower()] = all_tds[i + 1].string
            new_beach['id'] = 0
            new_beach['nombre'] = properties['nombre']
            new_beach['accesos'] = properties['accesos']
            new_beach['camping'] = properties['camping']
            new_beach['concejo'] = properties['concejo']
            new_beach['foto'] = properties['foto1']
            new_beach['longitud'] = properties['longitud']
            new_beach['material'] = properties['material']
            new_beach['salvamento'] = properties['salvamento']
            new_beach['nucleorural'] = properties['nucleo rural']  # nucleo rural cercano
            new_beach['nucleourbano'] = properties['nucleo urbano']  # nucleo urbano cercano
            new_beach['ocupacionmedia'] = properties['grado de uso']

            parsed_beaches.append(new_beach)

        return parsed_beaches
