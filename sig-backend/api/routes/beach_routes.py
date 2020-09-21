from flask_cors import cross_origin
from flask import request, jsonify
from flask import current_app as app
from api.controllers.beach_controller import BeachController


@app.route('/api/beaches-db', methods=['GET'])
@cross_origin()
def get_all_beaches():
    return jsonify(BeachController.get_all_beaches())


@app.route('/api/occupation', methods=['GET'])
@cross_origin()
def get_occupation():
    return BeachController.get_occupation()

@app.route('/api/beaches', methods=['GET'])
@cross_origin()
def get_all_beaches_from_cloud():
    return BeachController.get_all_beaches_from_cloud()

@app.route('/api/beaches/<int:id>', methods=['GET'])
@cross_origin()
def get_beach_by_id(id):
    return BeachController.get_beach_by_id(id)