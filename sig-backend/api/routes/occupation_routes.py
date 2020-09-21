from flask_cors import cross_origin
from flask import jsonify
from flask import current_app as app
from api.repository.occupation_repository import OccupationRepository


@app.route('/api/occupations', methods=['GET'])
@cross_origin()
def get_all_ocupations():
    return jsonify(OccupationRepository.get_all_ocupationes())
