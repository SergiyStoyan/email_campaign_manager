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

app.directive('pickFile', function ($parse) {
    return {
        require: 'ngModel',
        //scope: false,
        replace: true,
        link: function(scope, element, attrs, ngModel) {                  
        
           /* ngModel.$formatters = [(function (modelValue) {
            	console.log(modelValue);
                return undefined;
            })];                
            ngModel.$parsers = [(function(viewValue) {
            	console.log(viewValue);                
                var reader = new FileReader();		                
                reader.onload = function(e, w) {
                    scope.$apply(function() {
        				//var emails = reader.result.split(/[\s,;]+/);
	        			scope.EmailsFileMessage = "Found: " + reader.result.match(/[^\s,;]*?@[^\s,;]*?([\s,;]+|$)/g).length + " addresses";
	        			ngModel.$setValidity('emails', true);
	        			if(!scope.Data)
	        				scope.Data = {};
	        			scope.Data.list = reader.result;
	        			scope.Data.name = reader.fileName;
                    });
                };
	        	reader.fileName = element[0].files[0].name;
                reader.readAsText(element[0].files[0]);
                
                return undefined;
            })];*/
                	
            element.bind('change', function(e) {                
                var reader = new FileReader();		                
                reader.onload = function(e, w) {
                    scope.$apply(function() {
        				//var emails = reader.result.split(/[\s,;]+/);
	        			scope.EmailsFileMessage = "Found: " + reader.result.match(/[^\s,;]*?@[^\s,;]*?([\s,;]+|$)/g).length + " addresses";
	        			if(!scope.Data)
	        				scope.Data = {};
	        			scope.Data.list = reader.result;
	        			scope.Data.name = reader.fileName;
                    });
                };
	        	reader.fileName = element[0].files[0].name;
                reader.readAsText(element[0].files[0]);                
            });
        }
    };
});