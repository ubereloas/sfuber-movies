package com.sfubermovies.webclient.test.acceptance.env

class ServiceProcess {
    private Process process

    void start() {
        def rootDir = System.getenv('SFUBERMOVIES_ROOT_DIR')
        process = Runtime.runtime.exec("python service.py --db sfubermovies-test", null, new File("$rootDir/service/app/api"))
    }

    void stop() {
        ProcessManager.killProcessTree(process)
    }
}
