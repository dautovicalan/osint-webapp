import docker

DOCKER_FILE_PATH = "../docker"


class HarvesterService:
    def __init__(self):
        self.client = docker.from_env()
        self.client.images.build(path=DOCKER_FILE_PATH, tag="theharvester:latest")
        self.container = None

    def start_container(self):
        container = self.client.containers.run("theharvester:latest",
                                               "-H 0.0.0.0 -p 80",
                                               detach=True,
                                               ports={'80/tcp': 5001})
        self.container = container

    def close_container(self):
        self.container.stop()
        self.container.remove()


if __name__ == "__main__":
    harvester_service = HarvesterService()
    harvester_service.start_container()