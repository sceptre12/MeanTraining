(function (window) {
	var angular = window.angular;
	var session = window.sessionStorage;
	angular.module('mean')
		.controller('navCtrl', ['$scope', 'mainservice','$state','$rootScope', function ($scope, mainservice,$state, $rootScope) {
			$scope.loginNav = mainservice.nav.login;
			$scope.userNavs = mainservice.nav.userview;

			$scope.logout = function(links){
				if(links.link === 'mean.home'){
					session.clear();
					$rootScope.currentUser = "";
					$state.go(links.link);
				}
			}
	}])
}(window));
