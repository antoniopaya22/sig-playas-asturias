from flask_cors import cross_origin
from flask import request, jsonify
from flask import current_app as app
from api.controllers.beach_controller import BeachController


@app.route('/api/beaches', methods=['GET'])
@cross_origin()
def get_all_beaches():
    return jsonify(BeachController.get_all_beaches())


@app.route('/api/beaches/<int:id>', methods=['GET'])
@cross_origin()
def get_beach_by_id(id):
    return BeachController.get_beach_by_id(id)


@app.route('/api/search', methods=['POST'])
@cross_origin()
def get_beach_by_id():
    return BeachController.search_beach(request)
