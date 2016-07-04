'use strict';

//angular.module('EmailLists')

app.controller('EmailListsController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 var table = Cliver.InitTable({
			 	table_id: 'table_EmailLists',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
        	
        	var show_row_editor = table.definition.show_row_editor;
        	table.definition.show_row_editor = function (content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success, on_data_loaded) {	
        		show_row_editor(content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, function(){
	        			$scope.Files = [];
	    				$scope.AddFile();
	        			on_ok_success();
        			}
        			, on_data_loaded
        		);
        	};
        	      	
		};
				
  		$scope.Files = [];
  
  		$scope.AddFile = function() {
    		$scope.Files.push({Id:$scope.Files.length + 1});
    		//console.log($scope.Files.length);
  		};
    
    	$scope.AddFile();
    
		$scope.RemoveFile = function(file_id) {
			//var i = $scope.Files.indexOf(file);
			for(var i in $scope.Files)
				if($scope.Files[i].Id == file_id){					
					$scope.Files.splice(i, 1);
					return;
				}
		};
    
		$scope.SetFile = function(e) {
			var file_id = $(e).attr('ng-file_id');
			//console.log(file_id);
			var file;
			for(var i in $scope.Files)
				if($scope.Files[i].Id == file_id){					
					file = $scope.Files[i];
					break;
				}
			//console.log(file);
            var reader = new FileReader();		                
            reader.onload = function(e, w) {
                $scope.$apply(function() {
	        		if(!$scope.Data)
	        			$scope.Data = {};
	        		if(!$scope.Data.lists)
	        			$scope.Data.lists = {};
	        		$scope.Data.lists[file.FileName] = {
	        			list: reader.result,
	        			name: file.Name,
	        		};
	        		//file.Name = reader.fileName;
        			//var emails = reader.result.split(/[\s,;]+/);
	        		file.Message = "Found: " + reader.result.match(/[^\s,;]*?@[^\s,;]*?([\s,;]+|$)/g).length + " addresses";
                });
            };
            //console.log(e.files[0].name);
	        file.Message = '';
	        file.FileName = e.files[0].name;
	        file.Name = file.FileName;
            reader.readAsText(e.files[0]);
		};
		
    }]
);
/*
app.directive('pickFile', function ($parse) {
    return {
        require: 'ngModel',
        scope: false,
        replace: true,
        link: function(scope, element, attrs, ngModel) {                  
        
            ngModel.$formatters = [(function (modelValue) {
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
            })];
        }
    };
});*/
/*
app.directive('pickFile', function ($parse) {
    return {
        //require: 'ngModel',
        //scope: false,
        replace: true,
        link: function(scope, element, attrs, ngModel) {                  
   			
   			var emails_count = 0;
   			             	
            element.bind('change', function(e) {  console.log(element[0].files);
                var reader = new FileReader();		                
                reader.onload = function(e, w) {
                console.log(e);	
                    scope.$apply(function() {
	        			if(!scope.Data)
	        				scope.Data = {
	        					lists:[],
	        					name:null,
	        				};
	        			scope.Data.lists[reader.fileName] = reader.result;
	        			if(!scope.Data.name)
	        				scope.Data.name = reader.fileName;	        			
        				//var emails = reader.result.split(/[\s,;]+/);
        				emails_count += reader.result.match(/[^\s,;]*?@[^\s,;]*?([\s,;]+|$)/g).length;
	        			scope.EmailsFileMessage = "Found: " + emails_count + " addresses in " + Object.keys(scope.Data.lists).join(',');
                    });
                };
	        	reader.fileName = element[0].files[0].name;
                reader.readAsText(element[0].files[0]);                
            });
        }
    };
});*/