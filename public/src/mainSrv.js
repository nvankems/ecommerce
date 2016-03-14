angular.module('commApp').service('mainSrv', function ($http) {

    this.getProducts = function() {
        return $http.get('/api/products');
    };

    this.createProduct = function(product) {
        return $http.post('/api/products', product);
    }
});