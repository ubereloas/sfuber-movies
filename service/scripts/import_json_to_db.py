from copy import copy, deepcopy
import json
from os import path
from pymongo import MongoClient


def main():
    db = get_db()

    movies = get_movies_from_json_file()
    movie_documents = movies_without_location(movies)
    movie_ids = db.movies.insert_many(movie_documents).inserted_ids

    copy_ids_to_movies(movie_ids, movies)
    locations = get_location_documents(movies)
    db.locations.insert_many(locations)


def get_db():
    client = MongoClient()
    client.drop_database('sfubermovies')
    return client.sfubermovies


def get_movies_from_json_file():
    json_file = path.join(path.dirname(__file__), '../data/datasf_movies_10_18_2015_geocoded.json')
    with open(json_file) as file:
        movies = json.load(file)
    return movies


def movies_without_location(movies):
    res = deepcopy(movies)
    for movie in res:
        del movie['locations']
    return res


def copy_ids_to_movies(ids, movies):
    for idx, movie in enumerate(movies):
        movies[idx]['_id'] = ids[idx]


def get_location_documents(movies):
    locs = {}
    for movie in movies:
        for location in movie['locations']:
            coords = location['map_location']['coords']
            if not coords:
                continue

            key = str(round(coords['lat'], 5)) + ':' + str(round(coords['lng'], 5))
            if key in locs:
                locs[key]['movie_ids'].append(movie['_id'])
            else:
                locs[key] = {
                    'name': location['map_location']['name'],
                    'coordinates': {'latitude': coords['lat'], 'longitude': coords['lng']},
                    'movie_ids': [movie['_id']]
                }

    return list(locs.values())


if __name__ == '__main__':
    main()
