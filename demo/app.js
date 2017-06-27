
var demoApp = angular.module('demoApp', ['circle-completion'])
    .controller('demoCtrl', ['$scope', '$interval', function ($scope, $interval) {

        $scope.percentComplete1 = 96;
        $interval(function() {
            $scope.percentComplete1 = ($scope.percentComplete1 + 1) % 101;
        }, 1000);

        $scope.percentComplete2 = 75;
        $interval(function () {
            $scope.percentComplete2 = ($scope.percentComplete2 + 1) % 101;
        }, 100);

        $scope.percentComplete3 = 90;
        $interval(function () {
            $scope.percentComplete3 = ($scope.percentComplete3 + 1) % 101;
        }, 500);


        $scope.message1 = 'Progress';
        $scope.message2 = 'Complete!';

        $scope.callBackFunction = function(messageArg1, messsageArg2) {
            alert(messageArg1 + ' ' + messsageArg2);
        }

        $scope.callBackFunction2 = function (messageArg1) {
            alert(messageArg1);
        }
    }]);