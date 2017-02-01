(function() {
	'use strict';

	angular
		.module('tcApp')
		.directive('toolbar', toolbar);

	function toolbar() {
		return {
			templateUrl: 'components/toolbar/toolbar.tpl.html',
			controller: toolbarController,
			controllerAs: 'toolbar'
		}
	}

	function toolbarController(auth, store, $location, $http) {
		var vm = this;
		vm.login = login;
		vm.logout = logout;
		vm.auth = auth;
		vm.new_user = {};

		function login() {
			auth.signin({}, function(profile, token) {
				
				if (profile.identities[0].connection == "linkedin") {
					vm.new_user = {
						"id": profile.identities[0].user_id,
						"name": profile.name,
						"email": profile.email
					}
				} else if (profile.identities[0].connection == "facebook") {
					vm.new_user = {
						"id": profile.identities[0].user_id,
						"name": profile.name,
						"email": profile.email
					}
				} else if (profile.identities[0].connection == "Username-Password-Authentication") {
					vm.new_user = {
						"id": profile.identities[0].user_id,
						"name": profile.nickname,
						"email": profile.email
					}
				}
				console.log(vm.new_user);
				store.set('profile', vm.new_user);
				store.set('id_token', token);
				$http.post('/api/user', vm.new_user)
					 .then(function(newUser) {
					 	console.log(newUser)
					 })
				$location.path('/home');
				
			},
			function(error) {
				console.log(error);
			});
		}

		function logout() {
			store.remove('profile');
			store.remove('id_token');

			auth.signout();
			$location.path('/home');
		}
	}
})();