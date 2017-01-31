'use strict';

angular
	.module('tcApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
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
				templateUrl: 'components/home/home.tpl.html'
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
	});



// angular
// 	.module('tcApp', ['ui.router', 'satellizer'])
// 	.controller('MainController', MainController)
// 	.controller('HomeController', HomeController)
// 	.controller('LoginController', LoginController)
// 	.controller('SignupController', SignupController)
// 	.controller('LogoutController', LogoutController)
// 	.controller('ProfileController', ProfileController)
// 	.service('Account', Account)
// 	.config(configRoutes);

// configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
// function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

// 	$locationProvider.html5Mode({
// 		enabled: true,
// 		requireBase: false
// 	});

// 	$urlRouterProvider.otherwise('/');

// 	$stateProvider
// 		.state('home', {
// 			url: '/',
// 			templateUrl: 'templates/home.html',
// 			controller: 'HomeController',
// 			controllerAs: 'home'
// 		})
// 		.state('signup', {
// 			url: '/signup',
// 			templateUrl: 'templates/signup.html',
// 			controller: 'SignupController',
// 			controllerAs: 'sc',
// 			resolve: {
// 				skipIfLoggedIn: skipIfLoggedIn
// 			}
// 		})
// 		.state('login', {
// 			url: '/login',
// 			templateUrl: 'templates/login.html',
// 			controller: 'LoginController'
// 			controllerAs: 'lc',
// 			resolve: {
// 				skipIfLoggedIn: skipIfLoggedIn
// 			}
// 		})
// 		.state('logout', {
// 			url: '/logout',
// 			template: null,
// 			controller: 'LogoutController',
// 			resolve: {
// 				loginRequired: loginRequired
// 			}
// 		})
// 		.state('profile', {
// 			url: 'profile',
// 			templateUrl: 'templates/profile.html',
// 			controller: 'ProfileController',
// 			controllerAs: 'profile',
// 			resolve: {
// 				loginRequired: loginRequired
// 			}
// 		})
// 		.state('pledge', {
// 			url: 'pledge',
// 			templateUrl: 'templates/pledge.html',
// 			controller: 'PledgeController',
// 			controllerAs: 'pledge',
// 			resolve: {
// 				loginRequired: loginRequired
// 			}
// 		}) 

// 		function skipIfLoggedIn($q, $auth) {
// 			var deferred = $q.defer();
// 			if ($auth.isAuthenticated()) {
// 				deferred.reject();
// 			} else {
// 				deferred.resolve();
// 			}
// 			return deferred.promise;
// 		}

// 		function loginRequired($q, $location, $auth) {
// 			var deferred = $q.defer();
// 			if ($auth.isAuthenticated()) {
// 				deferred.resolve();
// 			} else {
// 				$location.path('/login');
// 			}
// 			return deferred.promise;
// 		}
// }

// MainController.$inject = ['Account'];
// function MainController(Account) {
// 	var vm = this;
// 	vm.currentUser = function() {
// 		return Account.currentUser();
// 	}
// }

// HomeController.$inject = ['$http'];
// function HomeController($http) {
	
// }

// PledgeController.$inject = ['$http'];
// function PledgeController($http) {
// 	var vm = this;
// 	vm.pledges = [];
// 	vm.new_pledge = {}; // form data

// 	$http.get('/api/pledges')
// 		.then(function(response) {
// 			vm.pledges = response.data;
// 		});

// 	vm.createPledge = function() {
// 		$http.post('/api/pledges', vm.new_pledge)
// 			 .then(function(response) {
// 			 	vm.new_pledge = {};
// 			 	vm.pledges.push(response.data);
// 			 });
// 	};
// }

// LoginController.$inject = ['$location', 'Account'];
// function LoginController($location, Account) {
// 	var vm = this;
// 	vm.new_user = {}; // form data

// 	vm.login = function() {
// 		Account
// 			.login(vm.new_user)
// 			.then(function() {
// 				vm.new_user = {}; // clears login form
// 				$location.path('/pledge'); // redirects to /pledge
// 			});
// 	};
// }

// SignupController.$inject = ['$location', 'Account'];
// function SignupController($location, Account) {
// 	var vm = this;
// 	vm.new_user = {}; // form data

// 	vm.signup = function() {
// 		Account
// 			.signup(vm.new_user)
// 			.then(
// 				function(response) {
// 					vm.new_user = {}; // clears signup form
// 					$location.path('/pledge')
// 				});
// 	};
// }

// ProfileController.$inject = ['$location', 'Account'];
// function ProfileController($location, Account) {
// 	var vm = this;
// 	vm.new_profile = {}; // form data

// 	vm.updateProfile = function() {
// 		Account
// 			.updateProfile(vm.new_profile)
// 			.then(function() {
// 				vm.showEditForm = false;
// 			});
// 	};
// }

// Account.$inject = ['$http', '$q', '$auth'];
// function Account($http, $q, $auth) {
// 	var self = this;
// 	self.user = null;
// 	self.signup = signup;
// 	self.login = login;
// 	self.logout = logout;
// 	self.currentUser = currentUser;
// 	self.getProfile = getProfile;
// 	self.updateProfile = updateProfile;

// 	function signup(userData) {
// 		return (
// 			$auth
// 				.signup(userData)
// 				.then(
// 					function onSuccess(response) {
// 						$auth.setToken(response.data.token);
// 					},

// 					function onError(error) {
// 						console.log(error);
// 					});
// 		);
// 	}

// 	function login(userData) {
// 		return (
// 			$auth
// 				.login(userData)
// 				.then(
// 					function onSuccess(response) {
// 						$auth.setToken(response.data.token);
// 					},

// 					function onError(error) {
// 						console.log(error);
// 					});
// 		);
// 	}

// 	function logout() {
// 		return (
// 			$auth
// 				.logout()
// 				.then(function() {
// 					self.user = null;
// 				})
// 		);
// 	}

// 	function currentUser() {
// 		if ( self.user ) { return self.user; }
// 		if ( !$auth.isAuthenticated() ) { return null; }

// 		var deferred = $q.defer();
// 		getProfile().then(
// 			function onSuccess(response) {
// 				self.user = response.data;
// 				deferred.resolve(self.user);
// 			},

// 			function onError() {
// 				$auth.logout();
// 				self.user = null;
// 				deferred.reject();
// 			}
// 		)
// 		self.user = promise = deferred.promise;
// 		return promise;
// 	}

// 	function getProfile() {
// 		return $http.get('/api/me');
// 	}

// 	function updateProfile(profileData) {
// 		return (
// 			$http
// 				.put('/api/me', profileData)
// 				.then(
// 					function(response) {
// 						self.user = response.data;
// 					}
// 				)
// 		);
// 	}
// }