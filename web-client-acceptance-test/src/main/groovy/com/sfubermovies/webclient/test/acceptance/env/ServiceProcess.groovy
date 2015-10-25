package com.sfubermovies.webclient.test.acceptance.env

class ServiceProcess {
    private Process process

    void start() {
        def rootDir = System.getenv('SFUBERMOVIES_ROOT_DIR')
        process = Runtime.runtime.exec("python service.py", ['DB_NAME=sfubermovies-test'] as String[], new File("$rootDir/service/app/api"))
    }

    void stop() {
        ProcessManager.killProcessTree(process)
    }
}
