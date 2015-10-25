package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.MapPage

import static cucumber.api.groovy.EN.*

Given(~'I am on the locations page') { ->
    to MapPage
}

When(~'I go to the locations page') { ->
    to MapPage
}