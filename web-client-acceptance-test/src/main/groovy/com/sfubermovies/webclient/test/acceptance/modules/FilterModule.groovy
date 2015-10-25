package com.sfubermovies.webclient.test.acceptance.modules

import geb.Module
import geb.module.TextInput
import org.openqa.selenium.Keys

class FilterModule extends Module {
    static base = { $('.filter-input-container') }
    static content = {
        input { $('input').module(TextInput) }
    }

    void byTitle(String title) {
        input.text = title
        waitFor { $('.angucomplete-dropdown .angucomplete-row').displayed }
        input << Keys.ENTER
    }

    void clear() {
        input.text = 'a' // Empty does not work so use something below search limit
    }
}
