import requests
import json
from pathlib import Path
from bs4 import BeautifulSoup
from shapely.geometry import Point, Polygon
from api.models.beach import Beach
from api.repository.beach_repository import BeachRepository


def load_geojson():
    get_static_info_from_geojson()


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
        try:
            if key in beaches_occ:
                new_beach['ocupacion_actual'] = float(beaches_occ[key]['medicion'])
                if len(beaches_occ[key]['fotos']) == 0:
                    new_beach['foto_tiempo_real'] = None
                else:
                    new_beach['foto_tiempo_real'] = beaches_occ[key]['fotos'][0]
            else:
                new_beach['ocupacion_actual'] = -1.0
                new_beach['foto_tiempo_real'] = None
            new_beach['nombre'] = beaches_list[key]['nombre']
            new_beach['longitud'] = float(beaches_list[key]['coord_x'])
            new_beach['latitud'] = float(beaches_list[key]['coord_y'])
            new_beach['municipio'] = beaches_list[key]['municipio']
            parsed_beaches.append(new_beach)
        except Exception as err:
            print(new_beach['nombre'] + " (" + beaches_list[key]['municipio'] + ") no se pudo cargar")
            pass
    return parsed_beaches


def get_static_info_from_geojson():
    json_file = Path('geojson/doc.geojson').resolve()
    json_file = open(json_file)
    beaches = json.load(json_file)['features']
    parsed_static_beaches = []
    parsed_real_time_beaches = get_occupation_api_data()
    for static_beach in beaches:
        coordinates = static_beach['geometry']['coordinates']
        description = static_beach['properties']['description']
        soup = BeautifulSoup(description, features="lxml")
        all_tds = soup.find_all('td')
        properties = {}
        for i in range(2, len(all_tds), 2):
            properties[all_tds[i].string.lower()] = all_tds[i + 1].string
        new_beach_coord = None
        new_beach_name = None
        for real_time_beach in parsed_real_time_beaches:
            if is_coord_in_polygon(real_time_beach['longitud'], real_time_beach['latitud'], coordinates):
                new_beach_coord = create_beach(real_time_beach, properties)
                break
            elif is_name_the_same(real_time_beach['nombre'], properties['nombre']) and \
                    is_name_the_same(real_time_beach['municipio'], properties['concejo']):
                new_beach_name = create_beach(real_time_beach, properties)
                break
            elif is_coord_near(real_time_beach['longitud'], real_time_beach['latitud'], coordinates, 0.0009):
                new_beach_name = create_beach(real_time_beach, properties)
                break
        if new_beach_coord is not None:
            add_to_db(new_beach_coord)
            parsed_static_beaches.append(new_beach_coord)
        elif new_beach_name is not None:
            add_to_db(new_beach_name)
            parsed_static_beaches.append(new_beach_name)
        else:
            new_beach_static = create_beach_static(coordinates, properties)
            add_to_db(new_beach_static)
            parsed_static_beaches.append(new_beach_static)
            pass
    print(len(parsed_static_beaches))
    return parsed_static_beaches


def create_beach(real_time_beach, properties):
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
        ocupacion_actual=real_time_beach['ocupacion_actual'],
        longitud=real_time_beach['longitud'],
        latitud=real_time_beach['latitud']
    )
    return new_beach


def create_beach_static(coordinates, properties):
    middle_point = calculate_middle_point(coordinates)
    new_beach = Beach(
        playa_id=None,
        nombre=properties['nombre'],
        accesos=properties['accesos'],
        camping=properties['camping'],
        concejo=properties['concejo'],
        foto_estatica=properties['foto1'],
        foto_tiempo_real="",
        longitud_playa=properties['longitud'],
        material=properties['material'],
        salvamento=properties['salvamento'],
        nucleo_rural=properties['nucleo rural'],
        nucleo_urbano=properties['nucleo urbano'],
        ocupacion_media=properties['grado de uso'],
        ocupacion_actual=-1,
        longitud=middle_point[0],
        latitud=middle_point[1]
    )
    return new_beach


def calculate_middle_point(list_of_coords):
    list_of_coords = parse_coordinates(list_of_coords)
    poly = Polygon(list_of_coords)
    return [poly.centroid.x, poly.centroid.y]


def add_to_db(beach):
    try:
        if beach.playa_id is not None:
            if BeachRepository.get_beach_by_playa_id(beach.playa_id) is None:
                BeachRepository.add_beach(beach)
        else:
            if BeachRepository.get_beach_by_nombre_concejo(beach.nombre, beach.concejo) is None:
                BeachRepository.add_beach(beach)
    except Exception as e:
        print(e)


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


def is_coord_near(coord_x, coord_y, list_of_coords, threshold):
    list_of_coords = parse_coordinates(list_of_coords)
    pt = Point(coord_x, coord_y)
    poly = Polygon(list_of_coords)
    dist = pt.distance(poly)
    return dist < threshold


def is_name_the_same(name_a, name_b):
    return name_a is name_b
