'use strict';

angular
	.module('tcApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
	// .module('tcApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router', 'modal-form', 'ui.bootstrap'])
	.config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

		jwtOptionsProvider.config({
			whiteListedDomains: ['localhost']
		})
		authProvider.init({
			domain: 'taxcutsforimpact.auth0.com',
			clientID: 'cl7FNIVPdTJUKFNHGoGkizy7o7XX40pH'
		});

		jwtInterceptorProvider.tokenGetter = function(store) {
			return store.get('id_token');
		}

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'components/home/home.tpl.html',
				controller: 'homeController as home'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'components/profile/profile.tpl.html',
				controller: 'profileController as user'
			})
			.state('pledge', {
				url: '/pledge',
				templateUrl: 'components/pledge/pledge.tpl.html',
				controller: 'pledgeController as pledge'
			});

		function redirect($q, $injector, store, $location) {
			return {
				responseError: function(rejection) {
					if (rejection.status === 401) {
						var auth= $injector.get('auth');
						auth.signout();
						store.remove('profile');
						store.remove('id_token');
						$location.path('/home');
					}

					return $q.reject(rejection);
				}
			}
		}

		$provide.factory('redirect', redirect);
		$httpProvider.interceptors.push('redirect');
		$httpProvider.interceptors.push('jwtInterceptor');
	})
	.run(function($rootScope, auth, store, jwtHelper, $location) {
		$rootScope.$on('$locationChangeStart', function() {
			var token = store.get('id_token');
			if (token) {
				if (!jwtHelper.isTokenExpired(token)) {
					if (!auth.isAuthenticated) {
						auth.authenticate(store.get('profile'), token);
					}
				}
			} else {
				$location.path('/home');
			}
		})
	})
	// .run(['$rootScope', '$window', 'formService', function($rootScope, $window, formService) {
	//     $rootScope.user = {
	//       email: "test@google.com",
	//       password: "test123456"
	//     };
	    
	//     $rootScope.init = function() {
	//       $window.location.reload();
	//     };
	    
	//     // open modal form dynamically
	//     $rootScope.open = formService({
	//       data: $rootScope.user,
	//       templateUrl: '/pledge/pledge.tpl.html',
	//       method: 'POST',
	//       callback: $rootScope.init,
	//       path: '/',
	//       dialogClass: 'small',
	//       closeOnSuccess: true
	//     });
	//   }]);

