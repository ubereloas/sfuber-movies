package com.sfubermovies.webclient.test.acceptance.modules

import geb.Module

class LocationDetailsModule extends Module {
    static base = { $('.location-details') }
    static content = {
        name { $('.location-name') }
        movieList { $('.movie-list') }
    }

    void assertContains(Map data) {
        waitFor { name.text() == data.name }
        data.movies.each { movie ->
            assert movieList.text().contains("$movie.title ($movie.year)")
        }
    }
}
