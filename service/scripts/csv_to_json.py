import json
from os import path

import googlemaps
from app.parsing.datasf_movies_csv_parser import DataSFMoviesCsvParser
from app.parsing.movie_location_geocoder import MovieLocationGeocoder


def main():
    movies = parse_movies_from_csv()
    geocode_movies(movies)
    write_to_json_file(movies)


def geocode_movies(movies):
    gmaps_client = googlemaps.Client(key="AIzaSyDwCk8c1eBXSIq7jWAkhSth0X1F3QgF3Gg")
    geocoder = MovieLocationGeocoder(gmaps_client)

    movies = sorted(movies, key=lambda x: x.title)
    for idx, movie in enumerate(movies):
        print("{}/{}".format(idx + 1, len(movies)))
        geocode_movie(movie, geocoder)


def parse_movies_from_csv():
    with open(path.join(path.dirname(__file__), '../data/datasf_movies_10_18_2015.csv')) as input:
        parser = DataSFMoviesCsvParser()
        return parser.parse(input)


def geocode_movie(movie, geocoder):
    for location in movie.locations:
        res = geocoder.geocode(location.map_location.name)
        if res.found:
            location.map_location.coords = {"lat": res.latitude, "lng": res.longitude}
            location.map_location.place_id = res.place_id
        print("       {} -> ({}, {}, {})".format(location.map_location.name, res.latitude, res.longitude, res.place_id))


def write_to_json_file(movies):
    movies_json = json.dumps(movies, default=lambda x: x.__dict__, ensure_ascii=False)

    json_path = path.join(path.dirname(__file__), '../data/datasf_movies_10_18_2015_geocoded.json')
    with open(json_path, "w") as file:
        file.write(movies_json)


if __name__ == "__main__":
    main()
