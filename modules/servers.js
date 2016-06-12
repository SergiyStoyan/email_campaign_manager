'use strict';

//angular.module('Servers')

app.controller('ServersController',
    ['$scope', '$route',
    function ($scope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Servers',
			 	server: {
                	request_path: $route.current.templateUrl.replace(/\.html$/i, '.php'),
            	},
        	});
		};	
		
    }]);