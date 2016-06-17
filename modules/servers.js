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
	                	var d = table_Servers.api().rows().data();
	                	for (var i in d)
							mark_testing_row(d[i][0]);
	                	
	                    table_Servers.api().columns.adjust();
	                },
	            },
		    };
		    table_Servers = Cliver.InitTable(definition);
		}
		
		function mark_testing_row(id){				
            var d = table_Servers.api().rows().data();
            for (var i in d) {
                if (d[i][0] == id) {                
					var class_;	
					if(testing_server_ids2state[id])
						class_ = 'TestingServer';
					else {
						switch(d[i][2]){
							case 'dead':
								class_ = 'DeadServer';
							break;
							case 'active':
								class_ = 'ActiveServer';
							break;
						}
					}                	
                	table_Servers.find('tbody tr:eq(' + i +')').addClass(class_);
                    return;
                }
            }
		}
		
		function test_server(id){			
			testing_server_ids2state[id] = 1;
			mark_testing_row(id);
			Cliver.Ajax.Request($rootScope.ApiUrl($route) + '?action=TestServer', {id: id}, function(data){
				testing_server_ids2state[id] = 0;
				table_Servers.api().draw(false);
			});
		}
	},
]);