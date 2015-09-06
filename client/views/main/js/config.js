(function(window){
	var angular = window.angular;
	angular.module('mean', ['ui.router', 'mean.auth','mean.user'])
	.config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider,$urlRouterProvider,$locationProvider){
		$urlRouterProvider.otherwise('/home');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$stateProvider
			.state('mean', {
				abstract: true,
				views: {
					navbar: {
						templateUrl: 'views/main/views/navbar.html',
						controller: 'navCtrl'
					},
					'': {
						template: '<ui-view/>'
					},
					footer: {
						templateUrl: 'views/main/views/footer.html',
						controller: 'footCtrl'
					}
				}
			})
			.state('mean.home', {
				url: '/home',
				templateUrl: 'views/main/views/home.html',
				controller: 'homeCtrl'
			})
			.state('mean.login', {
				url: '/auth/login',
				templateUrl: 'views/auth/views/login.html',
				controller: 'loginCtrl'
			})
			.state('mean.register', {
				url: '/auth/register',
				templateUrl: 'views/auth/views/register.html',
				controller: 'registerCtrl'
			})
			.state('mean.user', {
				url: '/user',
				templateUrl: 'views/user/views/profile.html',
				controller: 'profileCtrl'
			})
	}])
}(window));