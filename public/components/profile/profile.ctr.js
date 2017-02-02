(function() {
	'use strict';

	angular
		.module('tcApp')
		.controller('profileController', profileController);

	function profileController($http, store) {
		var vm = this;
		vm.getMessage = getMessage;
		vm.getSecretMessage = getSecretMessage;
		vm.message;
		vm.pledge = {};

		vm.profile = store.get('profile');

		function getMessage() {
			$http.get('http://localhost:3001/api/public', {
				skipAuthorization: true
				})
				.then(function(response) {
					vm.message = response.data.message;
				});
		}

		function getSecretMessage() {
			$http.get('http://localhost:3001/api/private')
				.then(function(response) {
					vm.message = response.data.message;
				});
		}

		function getCurrentUser() {
			vm.current = localStorage.getItem('profile');
			vm.currentUser = JSON.parse(vm.current);
			console.log(vm.currentUser);
		}

		getCurrentUser();

		function getPledge() {
			$http.get('/api/pledge')
				 .then(function(response) {
				 	vm.pledge = response.data[0];
				 	console.log(vm.pledge)
				 })
		}

		getPledge();
	}
})();