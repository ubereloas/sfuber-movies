package com.sfubermovies.webclient.test.acceptance.env

import geb.Browser
import geb.binding.BindingUpdater

import static cucumber.api.groovy.Hooks.After
import static cucumber.api.groovy.Hooks.Before

Before { scenario ->
    bindingUpdater = new BindingUpdater(binding, new Browser(driver: CucumberHooks.driver))
    bindingUpdater.initialize()
}

After { scenario ->
    bindingUpdater.remove()
}