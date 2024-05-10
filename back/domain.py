from datetime import datetime


class Harvester:
    def __init__(self, request):
        self.domain = request.get('domain')
        self.limit = request.get('limit')
        self.start = request.get('start')
        self.dns_lookup = request.get('dns_lookup')
        self.dns_brute = request.get('dns_brute')
        self.sources = request.get('sources')
        self.start_time = datetime.now()
        self.end_time = None

