from datetime import datetime, timedelta

import certifi
from bson import ObjectId
from flask import Flask, request, jsonify
from flask_cors import cross_origin
from pymongo import MongoClient

from domain import Harvester
from test.dummy_data import fetched_json
from utils.utils import parse_json

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"

mongodb_client = MongoClient(
    "mongodb+srv://alan:alan@cluster0.eyhbkbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    tlsCAFile=certifi.where())
db = mongodb_client.get_database("ptbox")

# STARTING THE HARVESTER SERVICE
# harvester_service = HarvesterService()
# harvester_service.start_container()


@app.route('/api/harvester', methods=['GET'])
@cross_origin()
def get_harvester_results():
    try:
        results = db.get_collection("harvester").find()
        return parse_json(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/harvester/<result_id>', methods=['GET'])
@cross_origin()
def get_harvester_result(result_id):
    try:
        result = db.get_collection("harvester").find_one({"_id": ObjectId(result_id)})
        if result is None:
            return jsonify({"error": "Result not found."}), 404
        return parse_json(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/harvester', methods=['POST'])
@cross_origin()
def add_harvester_result():

    try:
        front_data = request.get_json()
        harvesterDto = Harvester(front_data)

        # REQUEST TO THE HARVESTER

        data = fetched_json

        # TESTING PURPOSES
        harvesterDto.end_time = datetime.now() + timedelta(seconds=10)

        total_asns = data.get('asns')
        interesting_urls = data.get('interesting_urls')
        twitter_people_list_tracker = data.get('twitter_people')
        linkedin_people_list_tracker = data.get('linkedin_people')
        linkedin_links_tracker = data.get('linkedin_links')
        trello_urls = data.get('trello_urls')
        ips = data.get('ips')
        emails = data.get('emails')
        hosts = data.get('hosts')
        result = {
            "total_asns": total_asns,
            "interesting_urls": interesting_urls,
            "twitter_people_list_tracker": twitter_people_list_tracker,
            "linkedin_people_list_tracker": linkedin_people_list_tracker,
            "linkedin_links_tracker": linkedin_links_tracker,
            "trello_urls": trello_urls,
            "ips": ips,
            "emails": emails,
            "hosts": hosts,
            "start_time": harvesterDto.start_time,
            "end_time": harvesterDto.end_time,
            "domain": harvesterDto.domain,
            "sources": harvesterDto.sources,
        }
        db.get_collection("harvester").insert_one(result)

        return jsonify({"message": "Result added successfully."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(port=8000, debug=True)
