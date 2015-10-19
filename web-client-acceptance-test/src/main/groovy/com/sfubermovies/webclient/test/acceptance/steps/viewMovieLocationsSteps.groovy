package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage

import static cucumber.api.groovy.EN.Given
import static cucumber.api.groovy.EN.Then
import static cucumber.api.groovy.EN.When

Given(~'there are some movies in the system with distinct locations') { ->
    // Already in DB
}

When(~'I go to the map page') { ->
    to MapPage
}

Then(~'I should see a map marker for each of the distinct locations') { ->
    // We don't want to check the exact count since that means we have to update the test
    // every time the location count in the DB changes
    MapPage page  = at MapPage
    page.assertHasAtLeastMarkerCount(500)
}