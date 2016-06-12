'use strict';

//angular.module('EmailLists')

app.controller('EmailListsController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_EmailLists',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
		};
		
    }]
);