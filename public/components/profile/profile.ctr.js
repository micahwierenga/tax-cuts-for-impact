(function() {
	'use strict';

	angular
		.module('tcApp')
		.controller('profileController', profileController);

	function profileController($http, store) {
		var vm = this;
		vm.getMessage = getMessage;
		vm.getSecretMessage = getSecretMessage;
		vm.deletePledge = deletePledge;
		vm.updatePledge = updatePledge;
		vm.message;

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
		}

		getCurrentUser();

		function getPledge() {
			$http.get('/api/pledge')
				 .then(function(response) {
				 	vm.allPledges = response.data;
				 	vm.profilePledges = [];
				 	for (var i = 0; i < vm.allPledges.length; i++) {
				 		if (vm.allPledges[i].user_id == vm.currentUser.id) {
				 			vm.profilePledges.push(vm.allPledges[i]);
				 		}
				 	}
				 })
		}

		getPledge();

		function deletePledge(pledge) {
			$http
				.delete('/api/pledge/' + pledge.id)
				.then(function(response) {
					var pledgeIndex = vm.allPledges.indexOf(pledge);
					vm.allPledges.splice(pledgeIndex, 1);
					getPledge();
				})
		}

		function updatePledge(pledge) {
			console.log(pledge.id);
			console.log('updateUser');
			$http
				.put('/api/pledge/' + pledge.id)
				.then(function(response) {
					console.log("Here is the response back:" + response)
					// var pledgeIndex = vm.allPledges.indexOf(pledge);
					// vm.allPledges.splice(pledgeIndex, 1);
					// getPledge();
				})
		}
	}
})();