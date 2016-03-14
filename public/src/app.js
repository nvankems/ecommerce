angular.module('commApp', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../templates/home.html',
            controller: 'mainCtrl',
            resolve: {
                productInfo: function (mainSrv) {
                    return mainSrv.getProducts();
                }
            }
        })
        .state('admin', {
            url: '/admin',
            templateUrl: '../templates/admin.html',
            controller: 'adminCtrl'
        })

});