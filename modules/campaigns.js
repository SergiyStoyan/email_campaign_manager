'use strict';

//angular.module('Campaigns')

app.controller('CampaignsController', 
	['$scope', '$route', 
    function ($scope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Campaigns',
			 	server: {
                	request_path: $route.current.templateUrl.replace(/\.html$/i, '.php'),
            	},
        	});
        	
        	$scope.GetOptions();
		};
		
		$scope.GetOptions = function(){
			if(!$scope.Options){
				$.ajax({
		            type: 'POST',
		            url: 'modules/campaigns.php?action=GetOptions',
		            data: {},
		            success: function (data) {
		            	if(typeof(data) == 'string')
		            		Cliver.ShowError(data);
	                	else if(data._ERROR)
		            		Cliver.ShowError(data._ERROR);		            		
		            	$scope.Options = data;
		            	console.log($scope.Options);
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