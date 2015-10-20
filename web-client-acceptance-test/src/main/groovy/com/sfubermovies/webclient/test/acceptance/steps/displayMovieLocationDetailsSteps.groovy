package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service

import static cucumber.api.groovy.EN.*

Given(~'there are movies in the system filmed at the same location') { ->
    Service.setLocations([[
            name: 'Location name',
            coordinates: [latitude: 37.68, longitude: -122.45],
            movies: [
                    [title: 'Movie1', year: 2010],
                    [title: 'Movie2', year: 2011],
                    [title: 'Movie3', year: 2012]
            ]
    ]])
}

When(~'I open the details for that location') { ->
    MapPage page = to MapPage
    page.openLocationDetails(0)
}

Then(~'I should see the name of the location and the title and release year of the movies') { ->
    MapPage page = at MapPage
    page.currentLocationDetails.assertContains(
            name: 'Location name',
            movies: [
                [title: 'Movie1', year: 2010],
                [title: 'Movie2', year: 2011],
                [title: 'Movie3', year: 2012]
            ]
    )
}