from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import json


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#socket = SocketIO(app, cors_allowed_origins="*")

myclient = MongoClient('mongodb://db:27017/',username = 'admin', password = 'admin')
db = myclient["db_sa"]
reports = db["reports"]

@app.route('/', methods = ['GET'])
def init():
    return "Server A working correctly."

@app.route('/reports', methods = ['POST'])
def insertReport():
    try:
        data = request.get_json()
        reports.insert({
            "carnet"    : data['carnet'],
            "nombre"    : data['nombre'],
            "curso"     : data['curso'],
            "mensaje"   : data['mensaje'],
            "servidor"  : "A"
        })
        res = {
            "status"    : 200,
            "msg"       : "Reporte guardado exitosamente en server A."
        }
        return jsonify(res)
    except:
        res = {
            "status"    : 500,
            "msg"       : "Error interno server A."
        }
        return jsonify(res)

@app.route('/reports', methods = ['GET'])
def getReports():
    cursor = reports.find()
    json_docs = []
    for doc in cursor:
        json_doc = {
            "carnet"    : doc["carnet"],
            "nombre"    : doc["nombre"],
            "curso"     : doc["curso"],
            "mensaje"   : doc["mensaje"],
            "servidor"  : doc["servidor"]
        }
        json_docs.append(json_doc)
    return jsonify(json_docs)


if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 3000, debug = True)