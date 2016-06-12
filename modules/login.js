'use strict';

//angular.module('Login')

app.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'LoginService',
    function ($scope, $rootScope, $location, LoginService) { 
    
    	$scope.RememberMe = true;
    	
        $scope.Login = function () {
            $scope.dataLoading = true;
            LoginService.Login($scope.UserName, $scope.Password, $scope.RememberMe, function (user, error) {
                $rootScope.User = user;
                $scope.dataLoading = false;
                if (error)                 
                	$scope.error = error;
                else
                {
                    //LoginService.SetCredentials($scope.username, $scope.password);
                    $location.path('/campaigns');
                }
                $scope.$apply();
                return true;
            });
        };
    }]);