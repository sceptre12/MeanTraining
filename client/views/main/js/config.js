(function (window) {
	var angular = window.angular;
	var session = window.sessionStorage;
	angular.module('mean', ['ui.router', 'mean.auth', 'mean.user'])
		.run(['$rootScope', '$state', 'authservice', function ($rootScope,$state,authservice){
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
				/*
					Checks if the mean.user state is being transitioned to
					and then checks if the currentUser property is truthy
				*/
			
				if(fromState.name === "" && toState.name === "mean.user"){
					authservice.login({email : session.getItem('userEmail')})
					.then(function(response){
						console.log(response);
						var user = response.data.data;
						if(!user){
							$state.go('mean.login');
						} else{
							$rootScope.currentUser = user;
							$state.go('mean.user',{ user: user.name});
						}
					}, function(err){
						console.log(err);
						$state.go('mean.err');
					})
				}


				if (toState.name === "mean.user" && !$rootScope.currentUser ){
					$state.go('mean.login');
				}
				/*
					Checks if the user is already logged in
					if the user clicks on login again they automatically
					go to their home page
					 Currently causes an issue with stack overflow error
				*/
				// if (toState.name === "mean.login" && $rootScope.currentUser){
				// 	$state.go('mean.login', { user: $rootScope.currentUser.name })
				// }
			})
		}])
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise('/home');
			$locationProvider.html5Mode({
				enabled: true
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
					url: '/lists/:user',
					templateUrl: 'views/user/views/profile.html',
					controller: 'profileCtrl'
				})
				.state('mean.err', {
					url: '/error',
					templateUrl: 'views/404.html'
				})
	}])
}(window));
