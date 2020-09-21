import requests
import json
import kml2geojson
from pathlib import Path
from bs4 import BeautifulSoup

class BeachCloud:

    @staticmethod
    def get_beaches():

    # devuelve ocupacion de la API
    @staticmethod
    def get_occupation():
        try:
            url_occupation = 'https://playas.asturias.es/ocupacion.json'
            url_beaches = 'https://playas.asturias.es/playas.json'
            r_occupation = requests.get(url_occupation)
            r_beaches = requests.get(url_beaches)
            beaches_occ = r_occupation.json()
            beaches_list = r_beaches.json()
            parsed_beaches = {}
            for key in beaches_occ:
                new_beach = {}
                new_beach['id'] = 0 
                new_beach['concejo'] = beaches_occ[key]['concejo']
                new_beach['estado'] = beaches_occ[key]['estado']
                new_beach['fotos'] = beaches_occ[key]['fotos']
                new_beach['coordenadas'] = [beaches_list[key]['coord_x'],beaches_list[key]['coord_y']]
                parsed_beaches[key] = new_beach
            return parsed_beaches
        except Exception as e:
            print(e)
            return {}

    # devuelve atributos interesantes del kml/geojson
    @staticmethod
    def get_all_beaches():
        #  kml2geojson.main.convert('C:/Users/alba1/Desktop/trabajos/master/segundo/SIG/ProyectoFinal/doc.kml', 'geo.json') # con lo que parseé el kml
        json_file = Path('geojson/doc.geojson').resolve()
        json_file = open(json_file)
        beaches = json.load(json_file)['features']
        parsed_beaches = []
        for value in beaches:
            new_beach = {}
            new_beach['coordenadas'] = value['geometry']['coordinates']
            description = value['properties']['description']
            soup = BeautifulSoup(description, features="lxml")
            all_tds = soup.find_all('td')
            properties = {}
            for i in range(2, len(all_tds), 2):
                properties[all_tds[i].string.lower()] = all_tds[i+1].string
            new_beach['id'] = 0           
            new_beach['nombre'] = properties['nombre']            
            new_beach['accesos'] = properties['accesos']
            new_beach['camping'] = properties['camping']
            new_beach['concejo'] = properties['concejo']
            new_beach['foto'] = properties['foto1']
            new_beach['longitud'] = properties['longitud']
            new_beach['material'] = properties['material']
            new_beach['salvamento'] = properties['salvamento']
            new_beach['nucleorural'] = properties['nucleo rural'] # nucleo rural cercano 
            new_beach['nucleourbano'] = properties['nucleo urbano'] # nucleo urbano cercano
            new_beach['ocupacionmedia'] = properties['grado de uso'] 

            parsed_beaches.append(new_beach)
        
        return parsed_beaches