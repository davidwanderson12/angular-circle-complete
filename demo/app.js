
var demoApp = angular.module('demoApp', ['circle-completion'])
    .controller('demoCtrl', ['$scope', '$interval', function($scope, $interval) {
        $scope.percentComplete = 1;
        $interval(function() {
            $scope.percentComplete = ($scope.percentComplete + 1) % 100;
        }, 1000);
    }]);