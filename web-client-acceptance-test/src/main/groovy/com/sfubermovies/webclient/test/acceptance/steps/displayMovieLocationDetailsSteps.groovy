package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service

import static cucumber.api.groovy.EN.*

Given(~'there are some movies in the system filmed at the same location') { ->
    def movie1Id = Service.addMovie([
            title : "Movie 1",
            year : "1999"
    ])
    def movie2Id = Service.addMovie([
            title : "Movie 2",
            year : "2014"
    ])
    def movie3Id = Service.addMovie([
            title : "Movie 3",
            year : "2015"
    ])
    Service.addLocation([
            name: 'Loc 1',
            coordinates: [latitude: 37.68f, longitude: -122.45f],
            movie_ids: [movie1Id, movie2Id, movie3Id]
    ])
}

When(~'I open the details for that location') { ->
    MapPage page = to MapPage
    page.openLocationDetails(0)
}

Then(~'I should see the name of the location and the title and release year of the movies') { ->
    MapPage page = at MapPage
    page.currentLocationDetails.assertContains(
            name: 'Loc 1',
            movies: [
                [title: 'Movie 1', year: 1999],
                [title: 'Movie 2', year: 2014],
                [title: 'Movie 3', year: 2015]
            ]
    )
}