package com.sfubermovies.webclient.test.acceptance.modules

import geb.Module

class LocationDetailsModule  extends Module {
    static base = { $('.location-details') }
    static content = {
        name { $('.name') }
        movieList { $('.movie-list') }
    }

    def assertContains(Map data) {
        assert name.text() == data.name
        data.movies.each { name ->
            assert movieList.text().contains(name)
        }
    }
}
