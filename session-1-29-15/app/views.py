from app import app
from flask import jsonify, abort, make_response, request, url_for
from flask.ext.httpauth import HTTPBasicAuth
import manager


# @app.route('/')
# def reroute():
#     return redirect("/index.html", code=302)

@app.route('/get/graph/data')
def index():
	dataset = manager.dataset_to_json()
	if dataset is not None:
		
		return jsonify({"data" : dataset}), 200
	else :
		return jsonify({"data" : {}}), 404 



@app.route('/get/countries')
def countries():
	dataset = manager.get_countries()
	if dataset is not None:
		
		return jsonify({"data" : dataset}), 200
	else :
		return jsonify({"data" : {}}), 404 		