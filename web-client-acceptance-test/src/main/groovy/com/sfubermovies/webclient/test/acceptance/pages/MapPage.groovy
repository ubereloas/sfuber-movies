package com.sfubermovies.webclient.test.acceptance.pages

import com.sfubermovies.webclient.test.acceptance.modules.LocationDetailsModule
import geb.Page

class MapPage extends Page {
    static url = 'http://localhost:9090'
    static at = { $('.angular-google-map-container').displayed }
    static content = {
        markers(wait: true) { $('.gmnoprint area') }
        currentLocationDetails { module LocationDetailsModule }
    }

    def assertHasMarkerCount(int count) {
        waitFor {
            markers.size() == count
        }
    }

    def openLocationDetails(int index) {
        markers[index].click()
    }
}
