package com.sfubermovies.webclient.test.acceptance.env

class WebClientProcess {
    private Process mainProcess

    void start() {
        build()
        mainProcess = serve()
    }

    void stop() {
        ProcessManager.killProcessTree(mainProcess)
    }

    private void build() {
        Process buildProcess = execNpmTask('build')
        buildProcess.waitFor()
    }

    private Process serve() {
        return execNpmTask('serve')
    }

    private Process execNpmTask(String taskName) {
        def args = ['C:\\Program Files\\nodejs\\npm.cmd', 'run', taskName] as String[]
        return Runtime.runtime.exec(args, null, new File('C:\\Users\\Admin\\Desktop\\sfuber-movies\\web-client'))
    }
}
