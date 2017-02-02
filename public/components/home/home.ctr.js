'use strict'

angular
	.module('tcApp')
	.controller('homeController', homeController);

function homeController($http) {
	var vm = this;
	vm.result = result;
	vm.makePledge = makePledge;


	function result(total) {
		vm.product = vm.total.a * vm.total.b;
		$http
			.get('/api/orgs')
			.then(function(orgs) {
				vm.orgArr = orgs.data;
				console.log(vm.orgArr);
			})
	}

	function getCurrentUser() {
		vm.current = localStorage.getItem('profile');
		vm.currentUser = JSON.parse(vm.current);
		console.log(vm.currentUser);
	}

	getCurrentUser();

	function makePledge(pledge) {
		if (vm.currentUser == null) {
			return vm.noUser = "Please log in to create a pledge";
		}
		vm.new_pledge = {
			"id": 2,
			"user_id": vm.currentUser.id,
			"savings2016": vm.product 
		}
		console.log(vm.new_pledge);
		$http
			.post('/api/pledge', vm.new_pledge)
			.then(function(response) {
				vm.newPledge = response.data;
				console.log(vm.newPledge);
			});
	}
};