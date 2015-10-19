class Movie(object):
    def __init__(self, title, year, production_company, distributor, director, writer):
        self.title = title
        self.year = year
        self.production_company = production_company
        self.distributor = distributor
        self.director = director
        self.writer = writer

        self.locations = []
        self.actors = []

    def add_location(self, location):
        if not location.map_location.name or self.__location_with_same_name_exists(location):
            return
        self.locations.append(location)

    def add_actor(self, actor):
        if not actor or actor in self.actors:
            return
        self.actors.append(actor)

    def __location_with_same_name_exists(self, location):
        return len([l for l in self.locations if l.map_location.name == location.map_location.name]) > 0
