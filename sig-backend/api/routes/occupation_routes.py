from flask_cors import cross_origin
from flask import jsonify
from flask import current_app as app
from api.controllers.occupation_controller import OccupationController


@app.route('/api/occupations', methods=['GET'])
@cross_origin()
def get_all_ocupations():
    return jsonify(OccupationController.get_all_occupationes())


@app.route('/api/occupations/<int:id>', methods=['GET'])
@cross_origin()
def get_occupations_by_id(id):
    return OccupationController.get_occupation_by_id(id)


@app.route('/api/occupations/playa/<int:id>', methods=['GET'])
@cross_origin()
def get_occupations_by_id(id):
    return OccupationController.get_occupation_by_playa_id(id)
