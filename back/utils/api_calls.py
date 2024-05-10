import requests


class HarvesterQueryBuilder:
    def __init__(self, source, domain, limit):
        self.url = "http://localhost:5000"
        self.query = f"{self.url}/query?limit={limit}&source={source}&domain={domain}"

    def get_query(self):
        return self.query


def call_harvester_api():
    query = HarvesterQueryBuilder("all", "google.com", 10).get_query()
    response = requests.get(query)
    return response.json()
