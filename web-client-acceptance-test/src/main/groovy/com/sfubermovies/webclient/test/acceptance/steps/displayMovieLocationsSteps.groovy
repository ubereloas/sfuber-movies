package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import com.sfubermovies.webclient.test.acceptance.service.Service
import org.bson.types.ObjectId

import static cucumber.api.groovy.EN.*

Given(~'there are some movies in the system filmed at distinct locations far apart') { ->
    Service.addLocation([
            name: 'Loc 1',
            coordinates: [latitude: 37.68f, longitude: -122.45f],
            movie_ids: [new ObjectId()]
    ])
    Service.addLocation([
            name: 'Loc 2',
            coordinates: [latitude: 37.70f, longitude: -122.43f],
            movie_ids: [new ObjectId()]
    ])
    Service.addLocation([
            name: 'Loc 3',
            coordinates: [latitude: 37.72f, longitude: -122.49f],
            movie_ids: [new ObjectId()]
    ])
}

Given(~'there are some movies in the system filmed at distinct locations close together') { ->
    Service.addLocation([
            name: 'Loc 1',
            coordinates: [latitude: 37.68f, longitude: -122.45f],
            movie_ids: [new ObjectId()]
    ])
    Service.addLocation([
            name: 'Loc 2',
            coordinates: [latitude: 37.685f, longitude: -122.455f],
            movie_ids: [new ObjectId()]
    ])
    Service.addLocation([
            name: 'Loc 3',
            coordinates: [latitude: 37.69f, longitude: -122.46f],
            movie_ids: [new ObjectId()]
    ])
}

When(~'I go to the locations page') { ->
    to MapPage
}

And(~'I open the corresponding cluster') { ->
    MapPage page = at MapPage
    page.openClusterWithCount(3)
    page.assertHasMarkerCount(3)
}

Then(~'I should see each of the distinct locations') { ->
    MapPage page = at MapPage
    page.assertHasMarkerCount(3)
}

Then(~'I should see a location cluster containing the number of movies filmed at the distinct locations') { ->
    MapPage page = at MapPage
    page.assertHasClusterWithCount(3)

}