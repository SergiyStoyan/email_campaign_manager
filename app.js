'use strict';

//TBD:
//- validation
//- menu
//- mount html editor
//- test servers
//- unite edit forms 
//- processing div in dialog append as a child


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
				
		var user_type = $cookies.get('user_type');
		if(user_type)
			$rootScope.User = {type: user_type};//to display menu when reloading page
		else
			$rootScope.User = null;
												 
		$rootScope.Logout = function(){
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
    			$cookies.remove(k);
			});
			//sessionStorage.empty();alert(1);
			$rootScope.User = null;
			$location.path('/login');
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
				case 'contact':
					return 'Contact';					
			}
			return null;
		};
		
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
