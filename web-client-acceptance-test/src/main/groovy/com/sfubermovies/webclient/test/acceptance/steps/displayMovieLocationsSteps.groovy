package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service

import static cucumber.api.groovy.EN.*

Given(~'there are some movies in the system filmed at distinct locations') { ->
    Service.setLocations([
            [
                  name: 'Loc 1',
                  coordinates: [latitude: 37.68, longitude: -122.45],
                  movies: [[title: 'Movie1', year: 2010]]
            ],
            [
                  name: 'Loc 2',
                  coordinates: [latitude: 37.70, longitude: -122.43],
                  movies: [[title: 'Movie2', year: 2011]]
            ],
            [
                  name: 'Loc 3',
                  coordinates: [latitude: 37.72, longitude: -122.49],
                  movies: [[title: 'Movie3', year: 2012]]
            ]
    ])
}

When(~'I go to the locations page') { ->
    to MapPage
}

Then(~'I should see each of the distinct locations') { ->
    MapPage page = at MapPage
    page.assertHasMarkerCount(3)
}