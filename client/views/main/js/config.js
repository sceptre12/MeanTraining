(function(window){
	var angular = window.angular;
	angular.module('mean', ['ui.router', 'mean.auth'])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('mean', {
				abstract: true,
				views: {
					navbar: {
						templateUrl: 'views/main/views/navbar.html',
						controller: 'navCtrl'
					},
					'': {
						templateUrl: 'views/index.html'
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
				url: '/login',
				templateUrl: 'views/main/views/login.html',
				controller: 'loginCtrl'
			})
			.state('mean.register', {
				url: '/register',
				templateUrl: 'views/main/views/register.html',
				controller: 'registerCtrl'
			})
	}])
}(window));