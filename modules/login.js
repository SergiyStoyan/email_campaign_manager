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
            		//console.log(data);
	            	if(typeof(data) == 'string'){
                		Cliver.ShowError(data);
					}
					else if(data._ERROR){
                		Cliver.ShowError(data._ERROR);
					}
					else{
                    	$location.path('/campaigns');
						//$rootScope.User = data;
					}
	            },
	            error: function (xhr, error) {
	                console.log(error, xhr);
                	Cliver.ShowError(xhr.responseText + "<br>" + error);
	            }
	        });
        };
    }]);