package com.sfubermovies.webclient.test.acceptance.env

import com.sfubermovies.webclient.test.acceptance.service.Service
import cucumber.api.java.Before
import net.serenitybdd.core.Serenity
import net.thucydides.core.annotations.Managed
import org.openqa.selenium.WebDriver

class CucumberHooks {
    @Managed
    public static WebDriver driver
    private static boolean beforeAllHasBeenCalled = false
    private static WebClientProcess webClientProcess = new WebClientProcess()
    private static ServiceProcess serviceProcess = new ServiceProcess()

    /**
     * Implements missing beforeAll() and afterAll() in Cucumber.
     * order = 0 ensures this is run before env.groovy and therefore that Serenity has injected the
     * WebDriver instance when that is run.
     */
    @Before(order = 0)
    void beforeHook() {
        if (!beforeAllHasBeenCalled) {
            beforeAll()
            addShutdownHook { afterAll() }
            beforeAllHasBeenCalled = true
        }

        Service.resetDb()
    }

    private void beforeAll() {
        serviceProcess.start()
        webClientProcess.start()

        Serenity.currentSession.put('serviceUrl', 'http://localhost:5000')
    }

    private void afterAll() {
        webClientProcess.stop()
        serviceProcess.stop()
    }
}
