import atexit
import requests

from apscheduler.schedulers.background import BackgroundScheduler
from api.repository.occupation_repository import OccupationRepository
from api.repository.beach_repository import BeachRepository
from api.models.occupation import Occupation


def load_occupations(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=_load_occupations, args=[app], trigger="interval", seconds=5)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())


def _load_occupations(app):
    url_occupation = 'https://playas.asturias.es/ocupacion.json'
    r_occupation = requests.get(url_occupation)
    beaches_occ = r_occupation.json()
    for playa_id in beaches_occ:
        beach = beaches_occ[playa_id]
        try:
            with app.app_context():
                BeachRepository.cambiar_ocupacion_actual(playa_id, float(beach['medicion']))
                occupation = Occupation(
                    playa_id=playa_id,
                    timestamp=beach['hora'],
                    occupacion=float(beach['medicion']),
                    bajamar=beach['bajamar'],
                    pleamar=beach['pleamar']
                )
                OccupationRepository.add_occupation(occupation)
        except Exception as err:
            pass

