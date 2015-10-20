import json
from flask import Flask
from flask.ext.cors import CORS
from flask import jsonify
from os import path

app = Flask(__name__)
CORS(app)


@app.route('/movie-locations')
def movie_locations():
    with open(path.join(path.dirname(__file__), '../../data/datasf_movies_10_18_2015_geocoded.json')) as file:
        movies = json.load(file)

    locs = {}
    for movie in movies:
        for location in movie['locations']:
            coords = location['map_location']['coords']
            if not coords:
                continue

            key = str(round(coords['lat'], 5)) + ":" + str(round(coords['lng'], 5))
            if key not in locs:
                locs[key] = {
                    "coordinates": {"latitude": coords['lat'], "longitude": coords['lng']},
                    "movie_count": 1
                }
            else:
                locs[key]['movie_count'] += 1

    return jsonify({
        "data": list(locs.values())
    })


if __name__ == '__main__':
    app.run()
