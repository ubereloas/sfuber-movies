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
        Process p = Runtime.runtime.exec(args, null, new File('C:\\Users\\Admin\\Desktop\\sfuber-movies\\web-client'))
        startOutputGobbler(p) // Needed to avoid blocking when buffer is full
        return p;
    }

    private void startOutputGobbler(Process p) {
        def reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        Thread.start {
            while (reader.readLine() != null) {}
        }
    }
}
