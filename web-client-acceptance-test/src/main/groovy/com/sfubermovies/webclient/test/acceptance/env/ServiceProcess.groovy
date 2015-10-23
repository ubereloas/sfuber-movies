package com.sfubermovies.webclient.test.acceptance.env

class ServiceProcess {
    private Process process

    void start() {
        process = Runtime.runtime.exec("python service.py --db sfubermovies-test", null, new File('C:\\Users\\Admin\\Desktop\\sfuber-movies\\service\\app\\api'))
    }

    void stop() {
        ProcessManager.killProcessTree(process)
    }
}
