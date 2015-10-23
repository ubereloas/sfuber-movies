package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service

import static cucumber.api.groovy.EN.*

Given(~'there are some movies in the system filmed at distinct locations') { ->
    Service.addLocation([
            name: 'Loc 1',
            coordinates: [latitude: 37.68f, longitude: -122.45f],
            movie_ids: ['FakeID1']
    ])
    Service.addLocation([
            name: 'Loc 2',
            coordinates: [latitude: 37.70f, longitude: -122.43f],
            movie_ids: ['FakeID2']
    ])
    Service.addLocation([
            name: 'Loc 3',
            coordinates: [latitude: 37.72f, longitude: -122.49f],
            movie_ids: ['FakeID3']
    ])
}

When(~'I go to the locations page') { ->
    to MapPage
}

Then(~'I should see each of the distinct locations') { ->
    MapPage page = at MapPage
    page.assertHasMarkerCount(3)
}