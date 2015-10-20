import json
from flask import Flask, request, Response
from flask.ext.cors import CORS
from flask import jsonify
from os import path

app = Flask(__name__)
CORS(app)

movie_locs = []


@app.route('/movie-locations')
def movie_locations():
    global movie_locs
    if movie_locs:
        return jsonify({
            "data": movie_locs
        })

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
                    "name": location['map_location']['name'],
                    "coordinates": {"latitude": coords['lat'], "longitude": coords['lng']},
                    "movies": [{
                        "title": movie['title'],
                        "year": movie['year']
                    }]
                }
            else:
                locs[key]['movies'].append({
                    "title": movie['title'],
                    "year": movie['year']
                })

    return jsonify({
        "data": list(locs.values())
    })


@app.route('/set-movie-locations', methods=['POST'])
def set_movie_locations():
    global movie_locs
    movie_locs = request.get_json()
    return Response(status=200)


if __name__ == '__main__':
    app.run()
