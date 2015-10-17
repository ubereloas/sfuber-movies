package com.sfubermovies.webclient.test.acceptance.steps

import com.sfubermovies.webclient.test.acceptance.pages.HomePage

import static cucumber.api.groovy.EN.Given
import static cucumber.api.groovy.EN.Then
import static cucumber.api.groovy.EN.When

Given(~'everything is setup correctly') { ->
}

When(~'I go to the home page') { ->
    HomePage page = to HomePage
}

Then(~'I should see the first awesome message') { ->
    HomePage page = at HomePage
    page.waitForAwesomeTextMsg()
}