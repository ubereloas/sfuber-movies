import csv
from app.parsing.map_location import MapLocation
from app.parsing.movie import Movie

from app.parsing.movie_location import MovieLocation


class DataSFMoviesCsvParser(object):
    """
    Parses exported CSV files from the DataSF movies database by eliminating as much data duplication
    (aka denormalization) as possible and aggregating the data for each movie across rows.
    """
    TITLE_COL = 'Title'
    YEAR_COL = 'Release Year'
    LOCATION_COL = 'Locations'
    FUNFACT_COL = 'Fun Facts'
    PRODCOMPANY_COL = 'Production Company'
    DISTRIBUTOR_COL = 'Distributor'
    DIRECTOR_COL = 'Director'
    WRITER_COL = 'Writer'
    ACTOR1_COL = 'Actor 1'
    ACTOR2_COL = 'Actor 2'
    ACTOR3_COL = 'Actor 3'

    def __init__(self):
        self.movies = {}

    def parse(self, file):
        reader = csv.DictReader(file)
        self.movies = {}

        for row in reader:
            self.__process_row(row)

        return list(self.movies.values())

    def __process_row(self, row):
        if not self.__key_for(row) in self.movies:
            self.__add_new_movie(row)

        self.__add_location_to_movie(row)
        self.__add_actors_to_movie(row)

    def __add_location_to_movie(self, row):
        movie = self.movies[self.__key_for(row)]
        movie.add_location(MovieLocation(
            map_location=MapLocation(name=row[self.LOCATION_COL]),
            fun_fact=row[self.FUNFACT_COL]
        ))

    def __add_actors_to_movie(self, row):
        movie = self.movies[self.__key_for(row)]
        movie.add_actor(row[self.ACTOR1_COL])
        movie.add_actor(row[self.ACTOR2_COL])
        movie.add_actor(row[self.ACTOR3_COL])

    def __add_new_movie(self, row):
        movie = Movie(
            title=row[self.TITLE_COL],
            year=row[self.YEAR_COL],
            production_company=row[self.PRODCOMPANY_COL],
            distributor=row[self.DISTRIBUTOR_COL],
            director=row[self.DIRECTOR_COL],
            writer=row[self.WRITER_COL]
        )

        self.movies[self.__key_for(row)] = movie

    def __key_for(self, row):
        return row[self.TITLE_COL] + ":" + row[self.YEAR_COL]
