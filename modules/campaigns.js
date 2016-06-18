'use strict';

//angular.module('Campaigns')
app.controller('CampaignsController', 
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	    	    	    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Campaigns',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
        	
        	$scope.GetOptions();
		};
		
		$scope.GetOptions = function(){
			if(!$scope.Options){
				$.ajax({
		            type: 'POST',
		            url: $rootScope.ApiUrl($route) + '?action=GetOptions',
		            data: {},
		            success: function (data) {
			            if (data.Error) {
			            	Cliver.ShowError(data.Error);
			                return;
			            }	            		
		            	$scope.Options = data.Data;
		            	//console.log($scope.Options);
                		$scope.$apply();
		            },
		            error: function (xhr, error) {
		            	Cliver.ShowError(xhr.responseText);
		            }
		        });
			}
			return $scope.Options;
		}
		$scope.Options = null;
		
		$scope.Templates = function(){
			return [
      			{id: '1', name: 'Option A'},
      			{id: '2', name: 'Option B'},
      			{id: '3', name: 'Option C'}
    		]
		}
		
		$scope.EmailLists = function(){
			return [
      			{id: '1', name: 'EmailLists A'},
      			{id: '2', name: 'Option B'},
      			{id: '3', name: 'Option C'}
    		]
		}
		
		$scope.Servers = function(){
			return [
      			{id: '1', name: 'Servers A'},
      			{id: '2', name: 'Option B'},
      			{id: '3', name: 'Option C'}
    		]
		}
    }
]);

app.directive(
    'dateTimeInput',
    function(dateFilter) {
        return {
            require: 'ngModel',
            template: '<input type="datetime-local"></input>',
            replace: true,
            link: function(scope, elm, attrs, ngModelCtrl) {                    
                ngModelCtrl.$formatters = [(function (modelValue) {
                	//console.log(modelValue);
                    return dateFilter(new Date(modelValue), 'yyyy-MM-ddTHH:mm');
                })];                
                ngModelCtrl.$parsers = [(function(viewValue) {
                	//console.log(viewValue);
                	return viewValue.replace('T', ' ') + ":00";
                })];
            },
        };
});



