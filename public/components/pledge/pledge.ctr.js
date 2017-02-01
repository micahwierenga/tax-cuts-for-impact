(function() {
	'use strict';

	angular
		.module('tcApp')
		.controller('pledgeController', pledgeController);

	function pledgeController($http, store) {
		var vm = this;
		vm.makePledge = makePledge;
		vm.getSecretMessage = getSecretMessage;
		vm.message;

		vm.profile = store.get('profile');

		function makePledge() {
			$http.get('/api/pledge')
				.then(function(response) {
					vm.pledge = response.data.message;
				});
		}

		function getSecretMessage() {
			$http.get('http://localhost:3001/api/private')
				.then(function(response) {
					vm.message = response.data.message;
				});
		}
	}
})();