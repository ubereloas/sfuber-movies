package com.sfubermovies.webclient.test.acceptance.pages

import geb.Page

class MapPage extends Page {
    static url = 'http://localhost:9090'
    static at = { $('.angular-google-map-container').displayed }
    static content = {
        markers(wait: true) { $('.gmnoprint > img') }
    }

    def assertHasAtLeastMarkerCount(int count) {
        waitFor {
            markers.size() >= count
        }
    }
}
