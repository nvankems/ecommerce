angular.module('commApp').controller('mainCtrl', function ($scope, productInfo, mainSrv) {

    $scope.products = productInfo.data;

});
