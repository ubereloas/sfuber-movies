package com.sfubermovies.webclient.test.acceptance

import cucumber.api.CucumberOptions
import net.serenitybdd.cucumber.CucumberWithSerenity
import org.junit.runner.RunWith

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features = 'src/main/resources/features')
class SerenityJUnitRunner {
}
