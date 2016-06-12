'use strict';

//angular.module('Menu')

app.controller('MenuController',
    ['$scope', '$element', '$location', '$rootScope', 'LoginService',
    function ($scope, $element, $location, $rootScope, LoginService) {	
    		    		
    	$scope.SetMenu = function(){
			$element.find("li").removeClass("active");
			$element.find(".collapsible-body").hide();
			var ci = $($element).find("a[href='#" + $location.path().substring(1) + "']").closest("li");
			if(ci.length){
				ci.parents(".collapsible-body").show();
				ci.addClass("active");
			}
			
			/*var e = $('[ng-controller="MenuController"]');
			console.log($location.path().substring(1));	
			console.log(e.find('[href="#' + $location.path().substring(1) + '"]'));
			console.log(e.find('*'));
			console.log(e);*/
		}	
    		
		$scope.$on('$locationChangeSuccess', function (event, next) {
			$scope.SetMenu();
        });
        
		$scope.$watch(function() {return LoginService.Authorized();}, function (next, prev) {
			//console.log(next, prev);	
			$scope.SetMenu();					
        });
				 
		$scope.Initialize = function(){						    
		   /* $('.collapsible').collapsible({
  				accordion : true
			});	*/
			$scope.SetMenu();
		};
		//$scope.$on('$includeContentLoaded', $scope.initialize);			 
    }]);
    
   /*app.directive('login-required', [function() {
	    return {
	    	restrict: 'A',
	    	scope: true,
	    	link: function(scope, element, attrs) {
	    		scope.SetMenu1 = function (event, next) {
					next ? element.show() : element.hide();
					console.log(next);
        		};
        		scope.SetMenu1();
				scope.$watch('Authorized()', scope.SetMenu1); 
 			}
	    };
	}]);
    
   app.directive('menu', [function() {
	    return {
	    	restrict: 'A',
	    	scope: true,
	    	link: function(scope, element, attrs) {
	    		scope.SetMenu2 = function (event, next) {
	    			var n = $(element).closest('nav');
					n.find("li").removeClass("active");
					n.find(".collapsible-body").hide();
					var ci = n.find("a[href='#" + next.split('/').pop() + "']").closest("li");
					if(ci.length){
						ci.parents(".collapsible-body").show();
						ci.addClass("active");
					}
					console.log(next);
        		};
        		scope.SetMenu2();
	    		scope.$on('$locationChangeSuccess', scope.SetMenu2);
 			}
	    };
	}]);*/
            
    /*angular.element(document).ready(function () {		    
		$('.collapsible').collapsible({
      		accordion : true
    	});
    	//alert('page loading completed');
	});*/