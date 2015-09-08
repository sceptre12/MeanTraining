(function (window) {
	"use strict";
	var angular = window.angular;
	var session = window.sessionStorage;
	angular.module('mean.auth')
		.controller('registerCtrl', ['$scope', '$state', 'authservice','$rootScope' , function (
			$scope, $state, authservice, $rootScope) {
			$scope.register = {
				name: '',
				email: '',
				password: '',
				signedOn: true,
			};

			$scope.submit = function () {
				authservice.register($scope.register)
					.then(function (response) {
						var success = response.data.saved;
						console.log(success);
						if (success === 'success') {
							var userData = response.data.data;
							$rootScope.currentUser = userData;
							session.setItem( 'userEmail', userData.email );
							$state.go('mean.user', { user: userData.name});
						} else {
							$state.go('mean.register');
							console.log(error);
						}
					}, function (error) {
						console.log(error);
					})
			};
		}])
}(window));
