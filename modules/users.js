'use strict';

//angular.module('Users')

app.controller('UsersController', 
	['$scope', '$route', 
    function ($scope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Users',
			 	server: {
                	request_path: $route.current.templateUrl.replace(/\.html$/i, '.php'),
            	},
        	});
		};	
    }
]);