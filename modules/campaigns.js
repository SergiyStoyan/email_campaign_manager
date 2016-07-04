'use strict';

//angular.module('Campaigns')
app.controller('CampaignsController', 
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	var table;
    	$scope.FillTable = function(){
			 table = Cliver.InitTable({
			 	table_id: 'table_Campaigns',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	}, 
            	menu: {              
		            right: {
		                edit: true,
		                details: true,
		                copy: {
		                    text: "Copy",
		                    onclick: function () {
		                        if (!table.$('tr.selected').is("tr")) {
		                            ShowMessage("No row selected!", "Warning");
		                            return false;
		                        }
		                        
		                        var parameters = {};
		                        for (var i in table.definition.key_column_ids2name)
		                            parameters[table.definition.key_column_ids2name[i]] = table.fnGetData(table.$('tr.selected'))[i];
		                            
		                        table.modalBox = table.definition.show_row_editor(	                        
		                        	table.closest('[ng-controller]').find('[new-form]'),
		                        	'New',
		                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'GetByKeys'), 
		                        	parameters,
		                        	"Add",
		                        	Cliver.UpdateQueryStringParameter(table.definition.server.request_path, 'action', 'Add'), 
		                        	function () {
		                            	if (table.definition.server)
		                                	table.api().draw(false);
		                        	},
		                        	function (data) {
		                        		delete data.Data.id;
		                        		data.Data.status = 'new';
		                            	if (table.definition.server)
		                                	table.api().draw(false);
		                        	}
		                        );
		                        return false;
		                    },
		                },
		            },
		        },
		        datatable: {
	            	ajax: function (data, callback, settings) {
	            		var wheres = [];
	            		if($scope.Filter.status)
	            			wheres.push('campaigns.status="' + $scope.Filter.status + '"');
	            		if($scope.Filter.start_time1)
	            			//wheres.push('campaigns.start_time>="' + $scope.Filter.start_time1.toISOString().slice(0, 10) + '"');
	            			wheres.push('campaigns.start_time>="' + Cliver.DateTime.GetMySqlLocalDate($scope.Filter.start_time1) + '"');
	            		if($scope.Filter.start_time2)
	            			//wheres.push('campaigns.start_time<="' + $scope.Filter.start_time2.toISOString().slice(0, 10) + '"');
	            			wheres.push('campaigns.start_time>="' + Cliver.DateTime.GetMySqlLocalDate($scope.Filter.start_time2) + '"');
			            data.Filter = wheres.join(' AND ');
			            
			            $.ajax({
			                type: 'POST',
			                url: Cliver.UpdateQueryStringParameter($rootScope.ApiUrl($route), 'action', 'GetTableData'),
			                data: data,
			                success: function (data) {
								if (Cliver.Ajax.GetError(data)) {
			                        if(data.Data)
			                        	data = data.Data;
			                        else
			                        	data = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
			                    }
			                    callback(data.Data);
			                },
			                error: function (xhr, error) {
			                    console.log(error, xhr);
			                    Cliver.ShowError(xhr.responseText + '<br>' + error);
			                }
			            });
			        }
	            }
        	});
        	        	
        	var show_row_editor = table.definition.show_row_editor;
        	table.definition.show_row_editor = function (content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success, on_data_loaded) {	
        		show_row_editor(content_div_e, title, get_data_url, get_data_parameters, ok_button_text, put_data_url, on_ok_success,
	        		function(data){
	        			if(!data)//new
	        				$scope.Data = {
	        					start_time: Cliver.DateTime.GetMySqlLocalDateTime(new Date),
	        				};
	        			//console.log($scope.Data);
	        			$scope.$apply();
	        		}
           		);
        	};
        	
        	$scope.GetOptions();
		};
		$scope.Filter = {
			status: null,
			start_time1: null,
			start_time2: null,
		};
		
		$scope.RedrawTable = function(){
			table.api().draw();
		}
			
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
    }
]);

app.directive('dateTimeInput', function(dateFilter) {
    return {
        require: 'ngModel',
        template: '<input type="datetime-local"></input>',
        replace: true,
        link: function(scope, elm, attrs, ngModelCtrl) {                    
            ngModelCtrl.$formatters = [(function (modelValue) {
            	//console.log(modelValue);
            	//console.log(new Date(modelValue), 'yyyy-MM-ddTHH:mm:ss');
                return dateFilter(new Date(modelValue), 'yyyy-MM-ddTHH:mm:ss');
                //return modelValue;                
            })];                
            ngModelCtrl.$parsers = [(function(viewValue) {
            	//console.log(viewValue);
            	//console.log(Cliver.DateTime.GetMySqlLocalDateTime(viewValue));
            	return Cliver.DateTime.GetMySqlLocalDateTime(viewValue);
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
