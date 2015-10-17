package com.sfubermovies.webclient.test.acceptance.env

class ServiceProcess {
    private Process process

    void start() {
        process = Runtime.runtime.exec("python service.py -port 5100", null, new File('C:\\Users\\Admin\\Desktop\\sfuber-movies\\service'))
    }

    void stop() {
        ProcessManager.killProcessTree(process)
    }
}
