import argparse
from bson import json_util, ObjectId
from flask import Flask, Response, request
from flask.ext.cors import CORS
from pymongo import MongoClient

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument('--db', required=True, dest='db_name')
args = arg_parser.parse_args()
db_name = args.db_name

app = Flask(__name__)
CORS(app)


@app.route('/movie-locations')
def movie_locations():
    db = MongoClient()[db_name]
    locations = db.locations.find({}, {'coordinates': True, 'movie_ids': True})
    return Response(
        json_util.dumps({
            'movie_locations': locations
        }),
        mimetype='application/json'
    )


@app.route('/movie-locations/<id>/details')
def movie_location_details(id):
    db = MongoClient()[db_name]
    location_details = db.locations.find_one({'_id': ObjectId(id)}, {'coordinates': False})
    movies = db.movies.aggregate([
        {'$match': {'_id': {'$in': location_details['movie_ids']}}},
        {'$project': {'title': True, 'year': True}}
    ])
    return Response(
        json_util.dumps({
            'location_details': {
                'name': location_details['name'],
                'movies': list(movies)
            }
        }),
        mimetype='application/json'
    )


@app.route('/movies')
def movies():
    title_filter = request.args.get('titleFilter')

    db = MongoClient()[db_name]
    movies = db.movies.find(
        {'title': {'$regex': title_filter}},
        {'title': True, 'year': True}
    ).limit(10)

    return Response(
        json_util.dumps({
            'movies': list(movies)
        }),
        mimetype='application/json'
    )


if __name__ == '__main__':
    app.run()
