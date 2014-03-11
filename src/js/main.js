require('./plugins');
require('angular/angular');

angular.module('hmc', [])
.controller('GreetingCtrl', function ($scope) {
    $scope.msg = 'Hello world! This is HideMyConvo web-client.';
});
