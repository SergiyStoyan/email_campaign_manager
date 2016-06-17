'use strict';

//angular.module('Login')

app.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$route',
    function ($scope, $rootScope, $location, $route) { 
    
    	$scope.RememberMe = true;
    	
        $scope.Login = function () {
            $scope.Processing = true;
            $.ajax({
	            type: 'POST',
	            url: $rootScope.ApiUrl($route),
	            data: { UserName: $scope.UserName, Password: $scope.Password, RememberMe: $scope.RememberMe },
	            success: function (data) {
           			$scope.Processing = false;
                	$scope.$apply();
					if (Cliver.Ajax.GetError(data)) 
			            return;
					$rootScope.SetUser();//to fill user
                    $location.path('/campaigns');
	            },
	            error: function (xhr, error) {
	                console.log(error, xhr);
                	Cliver.ShowError(xhr.responseText + "<br>" + error);
	            }
	        });
        }
    }
]);
    
app.directive("processing", function() {
    return {
        template : '<img ng-if="Processing" src="' + Cliver.ProcessingImageSrc + '" style="height:23px;width:auto;"/>'
    };
});