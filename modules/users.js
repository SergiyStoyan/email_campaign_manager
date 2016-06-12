'use strict';

//angular.module('Users')

app.controller('UsersController', 
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Users',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
		};	
    }
]);