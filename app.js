'use strict';

//TBD:
//- mount html editor
//- add testing servers
//- unite edit forms 


Cliver.ProcessingImageSrc = 'images/ajax-loader.gif';

//angular.module('Login', []);
//angular.module('Servers', []);
//angular.module('Templates', []);
//angular.module('Users', []);
//angular.module('Campaigns', []);

var app = angular.module('EmailCampaignManager', [
    //'Login',
    //'Servers',
    //'Templates',
    //'Users',
    //'Campaigns',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider	
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/login.html',
        })		
        .when('/logout', { redirectTo: '/login' })
        .when('/servers', {
            controller: 'ServersController',
            templateUrl: 'modules/servers.html',
        })		
        .when('/templates', {
            controller: 'TemplatesController',
            templateUrl: 'modules/templates.html',
        })		
        .when('/users', {
            controller: 'UsersController',
            templateUrl: 'modules/users.html',
        })		
        .when('/campaigns', {
            controller: 'CampaignsController',
            templateUrl: 'modules/campaigns.html',
        })			
        .when('/email_lists', {
            controller: 'EmailListsController',
            templateUrl: 'modules/email_lists.html',
        })		
        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$timeout', '$location', '$cookies', '$http', 'LoginService',
    function ($rootScope, $timeout, $location, $cookies, $http, LoginService) {		
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, prev) {
            /*// redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }*/
        });
		
        $rootScope.$on('$locationChangeSuccess', function (event, next) {
			/*var scope = angular.element($("#Menu")).scope();
			if(!scope)
				return;*/
            //console.log(next);
        });
		
        $rootScope.$on('$routeChangeStart', function (event, next, prev) {         	
            if ($location.path() == '/logout')
            	LoginService.ClearCredentials();
            //console.log(next, prev);
        });
        
        /*$rootScope.$on('$includeContentLoaded', function() {
		});
		
		$rootScope.$on('$includeContentRequested', function() {
		});*/
		
		$rootScope.Initialize = function(){	
			//angular.element(document).ready(function($) {  
			$(document).ready(function($) { 				
				//preloader
				$('.preloader').fadeOut(300);			    
				//console.log(1);
			});
		}; 
        	
        //$timeout($rootScope.Initialize, 0);
        	
		$rootScope.$on('$viewContentLoaded', function(){
			$rootScope.Initialize();		 		
        	//$timeout($rootScope.Initialize, 0);  				
		//	console.log(22);
		});	 
		
		$rootScope.InitializeHeader = function(){
		}; 
		
		$rootScope.InitializeHeader1 = function(){
			$rootScope.InitializeHeader();
		};
		
		$rootScope.InitializeHeader2 = function(){
			//console.log(2);
			$rootScope.InitializeHeader();
		};
				
		$rootScope.Authorized = function(page) {
			return LoginService.Authorized();
		};				
												 
		$rootScope.User = function(){ 
			return user;
		}
		var user;
		$rootScope.SetUser = function(){
			user = {
				name:'',
				type:'',
			};//set while it is getting
			$.ajax({
		        type: 'POST',
		        url: 'server/api/login.php?action=GetCurrentUser',
		        data: null,
				//async: false,
		        success: function (data) {
		            console.log(data);
					if (Cliver.Ajax.GetError(data)) {
						if($location.path() != '/login')
							$location.path('/login');
		                return;
		            }
        			$rootScope.$apply(function(){user = data.Data;});
		        },
		        error: function (xhr, error) {
		            Cliver.ShowError(xhr.responseText + "<br>" + error);
		        }
		    });
		}
		$rootScope.SetUser();
					 
		$rootScope.Logout = function(){
			//does not work!
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
				//console.log(v,k);
    			$cookies.remove(k);
			});		
			
			//sessionStorage.clear();
			//localStorage.clear();
			
			//does not work!
			var cookies = document.cookie.split(";");
			for(var i=0; i < cookies.length; i++) {
    			var equals = cookies[i].indexOf("=");
    			var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
    			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
			console.log(document.cookie);
			
			$rootScope.User = null;
			//$location.path('login.php');
			window.location.href = 'server/logout.php';
		};
		//$rootScope.Logout();
		$rootScope.Header = function(){
			//console.log($location.path().substring(1));
			switch($location.path().substring(1))
			{
				case 'login':
					return null;
				case 'campaigns':
					return 'Campaigns';
				case 'templates':
					return 'Templates';
				case 'users':
					return 'Users';
				case 'servers':
					return 'Servers';	
				case 'email_lists':
					return 'Email Lists';					
			}
			return null;
		};
		
		$rootScope.ApiUrl = function(route){
			//return route.current.templateUrl.replace(/\.html$/i, '.php');
			var api = 'server/api/' + route.current.templateUrl.replace(/.*\/(.*?)\.html$/i, '$1.php');
			//console.log(api);
			return api;
		}
		
		$rootScope.HeaderType = function(){
			//console.log($location.path().substring(1));
			switch($location.path().substring(1))
			{
				case 'landing':
					return 1;
				case 'about':
				case 'contact':
				case 'announcements':
					return $rootScope.Authorized() ? 2 : 1;
			}
			return 2;
		};
    }
]);
