package com.sfubermovies.webclient.test.acceptance.service

import groovyx.net.http.RESTClient
import net.serenitybdd.core.Serenity
import org.apache.http.entity.ContentType

class Service {
    static void setLocations(locations) {
        String serviceUrl = Serenity.currentSession.get('serviceUrl')
        def service = new RESTClient(serviceUrl)
        service.post(
                path: 'set-movie-locations',
                body: locations,
                requestContentType: ContentType.APPLICATION_JSON
        )
    }
}