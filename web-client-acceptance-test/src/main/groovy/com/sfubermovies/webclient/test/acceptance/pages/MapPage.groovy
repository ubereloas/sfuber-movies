package com.sfubermovies.webclient.test.acceptance.pages

import com.sfubermovies.webclient.test.acceptance.modules.LocationDetailsModule
import geb.Page

class MapPage extends Page {
    static url = 'http://localhost:9090'
    static at = { $('.angular-google-map-container').displayed }
    static content = {
        markers(wait: true) { $('.gmnoprint area') }
        cluster(wait: true) { locationCount -> $('.cluster', text: locationCount as String) }
        currentLocationDetails { module LocationDetailsModule }
    }

    def openLocationDetails(int index) {
        markers[index].click()
    }

    def openClusterWithCount(count) {
        cluster(count).click()
    }

    def assertHasMarkerCount(int count) {
        waitFor {
            markers.size() == count
        }
    }

    def assertHasClusterWithCount(int count) {
        waitFor {
            cluster(count)
        }
    }
}
