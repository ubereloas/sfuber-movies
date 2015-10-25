package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service

import static cucumber.api.groovy.EN.*

Given(~'there are some movies in the system filmed at distinct locations with different titles') { ->
    def movie1Id = Service.addMovie([
            title: 'Movie1',
            year: 2012
    ])
    def movie2Id = Service.addMovie([
            title: 'Movie2',
            year: 2013
    ])
    Service.addLocation([
            name: 'Loc 1',
            coordinates: [latitude: 37.68f, longitude: -122.45f],
            movie_ids: [movie1Id]
    ])
    Service.addLocation([
            name: 'Loc 2',
            coordinates: [latitude: 37.70f, longitude: -122.43f],
            movie_ids: [movie2Id]
    ])
}

And(~'I (?:have )?add(?:ed)? a filter for one of the titles') { ->
    MapPage page = at MapPage
    page.filter.byTitle('Movie1')
}

When(~'I remove the filter') { ->
    MapPage page = at MapPage
    page.filter.clear()
}

Then(~'I should see only the locations where that movie has been filmed') { ->
    MapPage page = at MapPage
    page.assertHasMarkerCount(1)
    page.openLocationDetails(0)
    page.currentLocationDetails.assertContains([name: 'Loc 1'])
}

Then(~'I should see all movie locations again') { ->
    MapPage page = at MapPage
    page.assertHasMarkerCount(2)
}