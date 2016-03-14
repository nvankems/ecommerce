angular.module('commApp').controller('adminCtrl', function ($scope, mainSrv) {

    $scope.createProduct = function(product) {
        return mainSrv.createProduct(product);
    }

});