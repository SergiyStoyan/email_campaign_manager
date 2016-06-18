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
                		//$timeout(function(){$scope.Options = null;}, 0);
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

/*app.directive(
    'checkBox',
    function(dateFilter) {
        return {
            require: 'ngModel',
            template: '<input type="checkbox"></input>',
            replace: true,
            link: function(scope, elm, attrs, ngModelCtrl) { 
            	var initial_value = null;                   
                ngModelCtrl.$formatters = [(function (modelValue) {
                	if(initial_value === null)
                		initial_value = modelValue;
                	console.log(modelValue, '=>', modelValue == attrs.trueValue);
                    return modelValue == attrs.trueValue;
                })];                
                ngModelCtrl.$parsers = [(function(viewValue) {
                	console.log(initial_value);
                	console.log(attrs.trueValue);
                	console.log(viewValue, "=>", viewValue ? attrs.trueValue : initial_value);
                	return viewValue ? attrs.trueValue : initial_value;
                })];
            },
        };
});*/
