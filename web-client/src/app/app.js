angular.module('sfuber-movies', ['uiGmapgoogle-maps', 'angucomplete-alt'])
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBCIgbAqGrq5cq5DTlQFTcJdL9DcKCGpoI',
            v: '3.21'
        });
    })
    .run(function (uiGmapIsReady) {
        // TODO: remove when done debugging
        uiGmapIsReady.promise(1).then(function (instances) {
            window.map = instances[0].map;
        })
    });