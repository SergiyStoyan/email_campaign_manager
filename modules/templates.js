'use strict';

//angular.module('Templates')

app.controller('TemplatesController',
    ['$scope', '$rootScope', '$route',
    function ($scope, $rootScope, $route) {
    	
    	$scope.FillTable = function(){
			 Cliver.InitTable({
			 	table_id: 'table_Templates',
			 	server: {
                	request_path: $rootScope.ApiUrl($route),
            	},
        	});
		};
		
		$scope.InitTextarea = function(){
			
			
			
// Prevent jQuery UI dialog from blocking focusin
$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window, .moxman-window").length) {
		e.stopImmediatePropagation();
	}
});
		
		   tinyMCE.init({
		      mode : "textareas",
		      theme_advanced_toolbar_location : "top",
		      theme_advanced_toolbar_align : "left",
		      theme_advanced_statusbar_location : "bottom",
		      theme_advanced_resizing : true
		   });
		};
		$scope.InitTextarea2 = function(){alert(2);
		 $('#summernote').summernote();
   		};
		
    }]);