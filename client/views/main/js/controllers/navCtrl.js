(function (window) {
	var angular = window.angular;
	angular.module('mean')
		.controller('navCtrl', ['$scope', 'mainservice', function ($scope, mainservice) {
			$scope.loginNav = mainservice.nav.login;
			$scope.userNavs = mainservice.nav.userview;
	}])
}(window));
