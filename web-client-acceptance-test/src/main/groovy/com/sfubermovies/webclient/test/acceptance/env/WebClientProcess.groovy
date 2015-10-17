package com.sfubermovies.webclient.test.acceptance.env

class WebClientProcess {
    private Process process

    void start() {
        def args = ['C:\\Program Files\\nodejs\\npm.cmd', 'run', 'serve'] as String[]
        process = Runtime.runtime.exec(args, null, new File('C:\\Users\\Admin\\Desktop\\sfuber-movies\\web-client'))
    }

    void stop() {
        ProcessManager.killProcessTree(process)
    }
}
