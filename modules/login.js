'use strict';

//angular.module('Login')

app.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$route',
    function ($scope, $rootScope, $location, $route) { 
    
    	$scope.RememberMe = true;
    	
        $scope.Login = function () {
            $scope.dataLoading = true;
            $.ajax({
	            type: 'POST',
	            url: $rootScope.ApiUrl($route),
	            data: { UserName: $scope.UserName, Password: $scope.Password, RememberMe: $scope.RememberMe },
	            success: function (data) {
           			$scope.dataLoading = false;
                	$scope.$apply();
			        if (data.Error) {
			        	Cliver.ShowError(data.Error);
			            return;
			        }
			        $rootScope.User(true);//to fill user
                    $location.path('/campaigns');
	            },
	            error: function (xhr, error) {
	                console.log(error, xhr);
                	Cliver.ShowError(xhr.responseText + "<br>" + error);
	            }
	        });
        };
    }]);