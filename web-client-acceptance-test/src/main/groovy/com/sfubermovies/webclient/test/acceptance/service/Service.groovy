package com.sfubermovies.webclient.test.acceptance.service

import com.gmongo.GMongoClient
import org.bson.types.ObjectId

class Service {
    private static String DB_NAME = 'sfubermovies-test'

    static ObjectId addMovie(movie) {
        def defaults = [
                year : "2015",
                writer : "Ole Rasmussen (Renowned Author)",
                title : "The Greatest Film Ever",
                actors : ["Ole Rasmussen", "Keira Knightley"], // Oh yes
                production_company : "OR Productions",
                distributor : "OR Distributions",
                director : "Ole Rasmussen"
        ]
        def movieToInsert = defaults + movie

        withDb { db ->
            db.movies.insert(movieToInsert)
        }

        return movieToInsert._id
    }

    static void addLocation(location) {
        withDb { db ->
            db.locations << location
        }
    }

    static void resetDb() {
        withDb { db ->
            db.dropDatabase()
        }
    }

    private static void withDb(Closure closure) {
        def client = new GMongoClient()
        def db = client.getDB(DB_NAME)
        closure.call(db)
        client.close()
    }
}