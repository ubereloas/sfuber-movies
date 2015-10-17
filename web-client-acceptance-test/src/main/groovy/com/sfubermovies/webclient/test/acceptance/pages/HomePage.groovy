package com.sfubermovies.webclient.test.acceptance.pages

import geb.Page

class HomePage extends Page {
    static url = 'http://localhost:9090'
    static at = {
        true
    }

    void waitForAwesomeTextMsg() {
        waitFor {
            $().text().contains 'This is going to be an awesome app!'
        }
    }
}
