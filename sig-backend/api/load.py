import requests
import json
from pathlib import Path
from bs4 import BeautifulSoup
from shapely.geometry import Point, Polygon
from api.models.beach import Beach


def load_geojson():
    print(get_static_info_from_geojson()[0].to_json())


def get_occupation_api_data():
    url_occupation = 'https://playas.asturias.es/ocupacion.json'
    url_beaches = 'https://playas.asturias.es/playas.json'
    r_occupation = requests.get(url_occupation)
    r_beaches = requests.get(url_beaches)
    beaches_occ = r_occupation.json()
    beaches_list = r_beaches.json()
    parsed_beaches = []

    for key in beaches_list:
        new_beach = {'playa_id': key}
        if key in beaches_occ:
            new_beach['ocupacionactual'] = beaches_occ[key]['estado']
            if len(beaches_occ[key]['fotos']) == 0:
                new_beach['foto_tiempo_real'] = []
            else:
                new_beach['foto_tiempo_real'] = beaches_occ[key]['fotos'][0]
        else:
            new_beach['ocupacionactual'] = None
            new_beach['foto_tiempo_real'] = []
        try:
            new_beach['longitud'] = float(beaches_list[key]['coord_x'])
            new_beach['latitud'] = float(beaches_list[key]['coord_y'])
            parsed_beaches.append(new_beach)
        except:
            pass
    return parsed_beaches


def get_static_info_from_geojson():
    json_file = Path('geojson/doc.geojson').resolve()
    json_file = open(json_file)
    beaches = json.load(json_file)['features']
    parsed_static_beaches = []
    parsed_real_time_beaches = get_occupation_api_data()
    for real_time_beach in parsed_real_time_beaches:

        for static_beach in beaches:
            coordinates = static_beach['geometry']['coordinates']
            if is_coord_in_polygon(real_time_beach['longitud'], real_time_beach['latitud'], coordinates):
                description = static_beach['properties']['description']
                soup = BeautifulSoup(description, features="lxml")
                all_tds = soup.find_all('td')
                properties = {}
                for i in range(2, len(all_tds), 2):
                    properties[all_tds[i].string.lower()] = all_tds[i + 1].string
                new_beach = Beach(
                    playa_id=real_time_beach['playa_id'],
                    nombre=properties['nombre'],
                    accesos=properties['accesos'],
                    camping=properties['camping'],
                    concejo=properties['concejo'],
                    foto_estatica=properties['foto1'],
                    foto_tiempo_real=real_time_beach['foto_tiempo_real'],
                    longitud_playa=properties['longitud'],
                    material=properties['material'],
                    salvamento=properties['salvamento'],
                    nucleo_rural=properties['nucleo rural'],
                    nucleo_urbano=properties['nucleo urbano'],
                    ocupacion_media=properties['grado de uso'],
                    ocupacion_actual=real_time_beach['ocupacionactual'],
                    longitud=real_time_beach['longitud'],
                    latitud=real_time_beach['latitud']
                )
                parsed_static_beaches.append(new_beach)
    return parsed_static_beaches


def parse_coordinates(coordinates):
    coord_list = []
    for coord in coordinates[0]:
        coord_list.append((float(coord[0]), float(coord[1])))
    return coord_list


def is_coord_in_polygon(coord_x, coord_y, list_of_coords):
    list_of_coords = parse_coordinates(list_of_coords)
    pt = Point(coord_x, coord_y)
    poly = Polygon(list_of_coords)
    return poly.contains(pt)
