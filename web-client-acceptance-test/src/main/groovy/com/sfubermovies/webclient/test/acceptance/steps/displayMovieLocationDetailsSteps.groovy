package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage
import groovyx.net.http.RESTClient
import net.serenitybdd.core.Serenity
import org.apache.http.entity.ContentType

import static cucumber.api.groovy.EN.Given
import static cucumber.api.groovy.EN.Then
import static cucumber.api.groovy.EN.When

Given(~'there are movies in the system filmed at the same location') { ->
    String serviceUrl = Serenity.currentSession.get('serviceUrl')
    def service = new RESTClient(serviceUrl)
    service.post(
            path: 'set-movie-locations',
            body: [[
                           name: 'Location name',
                           coordinates: [latitude: 37.68, longitude: -122.45],
                           movies: ['Movie1', 'Movie2', 'Movie3']
                   ]],
            requestContentType: ContentType.APPLICATION_JSON
    )
}

When(~'I open the details for that location') { ->
    MapPage page = to MapPage
    page.openLocationDetails(0)
}

Then(~'I should see the locations name and the movie titles') { ->
    MapPage page = at MapPage
    page.currentLocationDetails.assertContains(
            name: 'Location name',
            movies: ['Movie1', 'Movie2', 'Movie3']
    )
}