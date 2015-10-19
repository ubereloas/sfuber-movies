import json
from os import path

import googlemaps
from app.parsing.datasf_movies_csv_parser import DataSFMoviesCsvParser
from app.parsing.movie_location_geocoder import MovieLocationGeocoder

with open(path.join(path.dirname(__file__), '../data/datasf_movies_10_18_2015.csv')) as input:
    parser = DataSFMoviesCsvParser()
    movies = parser.parse(input)

movies = sorted(movies, key=lambda x: x.title)
gmaps_client = googlemaps.Client(key="AIzaSyDwCk8c1eBXSIq7jWAkhSth0X1F3QgF3Gg")
geocoder = MovieLocationGeocoder(gmaps_client)

for idx, movie in enumerate(movies):
    print("{}/{}".format(idx + 1, len(movies)))

    for location in movie.locations:
        res = geocoder.geocode(location.map_location.name)
        if res.found:
            location.map_location.coords = {"lat": res.latitude, "lng": res.longitude}
            location.map_location.place_id = res.place_id
        print("       {} -> ({}, {}, {})".format(location.map_location.name, res.latitude, res.longitude, res.place_id))

with open(path.join(path.dirname(__file__), '../data/datasf_movies_10_18_2015_geocoded.json'), "w") as file:
    file.write(json.dumps(movies, default=lambda x: x.__dict__, ensure_ascii=False))
