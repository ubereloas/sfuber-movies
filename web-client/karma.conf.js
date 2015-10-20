module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify','jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/app/main.js',
            'src/test/**/*.js'
        ],
        exclude: [],
        preprocessors: {
            'src/app/main.js': ['browserify']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    })
};
