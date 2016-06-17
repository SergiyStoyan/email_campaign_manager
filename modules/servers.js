'use strict';

//angular.module('Servers')

app.controller('ServersController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	var testing_server_ids2state = {};
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
		                    	//$(definition._table.api().row('.selected').data()[0])
		                    	test_server(definition._table.api().row('.selected').data()[0]);
		                    	console.log(definition._table.api().row('.selected').data()[0]);
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
            	if(Number(i) === i)
            		continue;
            	var row = table_Servers.find('tbody tr:eq(' + i +')');
				console.log(d[i][0]);
				if(testing_server_ids2state[d[i][0]])
				{
					row.removeClass('ActiveServer');
					row.removeClass('DeadServer');
					row.addClass('TestingServer');
				}
				else {
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
					}
				}   
            }
		}
		
		function test_server(id){			
			testing_server_ids2state[id] = 1;
			mark_rows();
			Cliver.Ajax.Request($rootScope.ApiUrl($route) + '?action=TestServer', {id: id}, function(data){
				testing_server_ids2state[id] = 0;
				table_Servers.api().draw(false);
			});
		}
	},
]);