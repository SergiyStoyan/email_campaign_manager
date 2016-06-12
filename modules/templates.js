'use strict';

//angular.module('Templates')

app.controller('TemplatesController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Templates',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
		};	
		
    }]);