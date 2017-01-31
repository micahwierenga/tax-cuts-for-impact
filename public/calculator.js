angular
	.module('tcApp')
	.controller('CalculatorController', function($scope) {
		$scope.result = function() {
			return $scope.a + $scope.b;
		}
	});