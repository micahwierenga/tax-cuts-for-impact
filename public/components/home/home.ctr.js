'use strict'

angular
	.module('tcApp')
	.controller('homeController', homeController);

function homeController($http, $location) {
	var vm = this;
	vm.result = result;
	vm.getAllOrgs = getAllOrgs;
	vm.getOrgs = getOrgs;
	// vm.getTotalPledges = getTotalPledges;
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

	function getAllOrgs() {
		$http
			.get('/api/orgs')
			.then(function(response) {
				vm.allOrgsArr = response.data;
				console.log(vm.allOrgsArr);
			})
	}

	getAllOrgs();

	function getOrgs() {
		vm.estimatedSavingsLocal = localStorage.getItem('estimated savings') * -1;
		$http
			.get('/api/orgs')
			.then(function(orgs) {
				vm.orgArr = [];
				for (var i = 0; i < orgs.data.length; i++) {
					if (vm.estimatedSavingsLocal < 5000 && orgs.data[i].threshold == 1) {
						vm.orgArr.push(orgs.data[i]);
					} else if (vm.estimatedSavingsLocal >= 5000 && orgs.data[i].threshold >= 1) {
						vm.orgArr.push(orgs.data[i]);
					}
				}
				
			})
	}

	// getOrgs();

	// function getTotalPledges() {
	// 	$http
	// 		.get('/api/pledge')
	// 		.then(function(pledges) {
	// 			vm.totalPledges = pledges.data;
	// 			console.log(vm.totalPledges);
	// 		})

	// }

	// getTotalPledges();

	function getCurrentUser() {
		vm.current = localStorage.getItem('profile');
		vm.currentUser = JSON.parse(vm.current);
	}

	getCurrentUser();

	function makePledge(pledge) {
		if (vm.currentUser == null) {
			return vm.noUser = "Please log in to create a pledge";
		}
		var savings2016Value = document.getElementById('estimatedSavings').innerHTML;
		vm.new_pledge = {
			"user_id": vm.currentUser.id,
			"savings2016": savings2016Value,
			"pledge2016": '$' + pledge.amount,
			"org": pledge.org,
			"zip": pledge.zip
		}
		$http
			.post('/api/pledge', vm.new_pledge)
			.then(function(response) {
				vm.newPledge = response.data;
				$location.path('/profile');
			});
		$http
			.get('/api/orgs')
			.then(function(response) {
				vm.orgPledgeArr = response.data;
				vm.orgTotalDonations = [];
				for (var i = 0; i < vm.orgPledgeArr.length; i++) {
					vm.orgTotalDonations.push(vm.orgPledgeArr[i].totalDonations);
				}
				vm.currentDonation = {

				}
			})
		// vm.updatedOrg = {
		// 	"name": ,
		// 	"totalDonations": pledge.amount
		// }
		$http
			.put('/api/orgs/' + pledge.org, pledge.amount)
			.then(function(response) {
				vm.updatedOrg = response.data;
				console.log(updatedOrg);
			})
	}

};