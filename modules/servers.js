'use strict';

//angular.module('Servers')

app.controller('ServersController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	var table_Servers;
    	
    	$scope.FillTable = function(){
		    var definition_ = Cliver.InitTable(false);
		    var definition = {
		        table_id: "table_Servers",
		        server: {
		            request_path: $rootScope.ApiUrl($route),
		        },
		        menu: {              
		            right: {
		                edit: true,
		                details: true,
		                test: {
		                    text: "Test",
		                    onclick: function () {
		                    	test_server(definition._table.api().row('.selected').data()[0]);
		                    	return false;
		                    },
		                },
		            },
		            left: {
		                edit: false,
		                details: false,
		                delete: true,
		            },
		        },
            	datatable: {
	                drawCallback: function (settings) {
						mark_rows();	                	
	                    table_Servers.api().columns.adjust();
	                },
	            },
		    };
		    table_Servers = Cliver.InitTable(definition);
		}
		
		function mark_rows(){
            var d = table_Servers.api().rows().data();
            for (var i in d) {
            	var row = table_Servers.find('tbody tr:eq(' + i +')');
				switch(d[i][2]){
					case 'dead':
						row.removeClass('ActiveServer');
						row.removeClass('TestingServer');
						row.addClass('DeadServer');
					break;
					case 'active':
						row.removeClass('DeadServer');
						row.removeClass('TestingServer');
						row.addClass('ActiveServer');
					break;
					case 'testing':
						row.removeClass('ActiveServer');
						row.removeClass('DeadServer');
						row.addClass('TestingServer');
					break;
				}   
            }
		}
		
		function test_server(id){					
            var d = table_Servers.api().rows().data();
            for (var i in d) {
            	if(d[i][0] != id)
            		continue;
            	var row = table_Servers.find('tbody tr:eq(' + i +')');
				row.removeClass('ActiveServer');
				row.removeClass('DeadServer');
				row.addClass('TestingServer');
				row.find('td:eq(1)').html('testing');
				break;
            }
			
			Cliver.Ajax.Request($rootScope.ApiUrl($route) + '?action=TestServer', {id: id}, function(data){				
	            var d = table_Servers.api().rows().data();
	            for (var i in d) {
            		if(d[i][0] != id)
	            		continue;
	            	var row = table_Servers.find('tbody tr:eq(' + i +')');
					switch(data.status){
						case 'dead':
							row.removeClass('ActiveServer');
							row.removeClass('TestingServer');
							row.addClass('DeadServer');
						break;
						case 'active':
							row.removeClass('DeadServer');
							row.removeClass('TestingServer');
							row.addClass('ActiveServer');
						break;
						case 'testing':
							row.removeClass('ActiveServer');
							row.removeClass('DeadServer');
							row.addClass('TestingServer');
						break;
					}
					row.find('td:eq(1)').html(data.status);
					row.find('td:eq(2)').html(data.status_time);
					break;
	            }
			});
		}
	},
]);