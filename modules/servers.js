'use strict';

//angular.module('Servers')

app.controller('ServersController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Servers',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
		};	
		
    }]);