angular.module('sfuber-movies', ['uiGmapgoogle-maps', 'angucomplete-alt'])
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBCIgbAqGrq5cq5DTlQFTcJdL9DcKCGpoI',
            v: '3.21'
        });
    });