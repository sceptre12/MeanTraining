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

(function (window) {
	var angular = window.angular;
	angular.module('mean')
		.factory('mainservice', [function () {
			return {
				nav: {
					login: [
						{
							name: 'Login',
							link: 'mean.login'
					},
						{
							name: 'Register',
							link: 'mean.register'
					}
				],
					userview: [
						{
							name: 'profile',
							link: 'mean.user'
					}, {
						name: 'logout',
						link: 'mean.home'
					}
				]
				}
			}
	}])
}(window));

(function (window) {
	var angular = window.angular;
	angular.module('mean')
		.controller('footCtrl', ['$scope', function ($scope) {

		}])
}(window));

(function (window) {
	var angular = window.angular;
	angular.module('mean')
		.controller('homeCtrl', ['$scope', function ($scope) {

	}])
}(window));

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

(function (window) {
	var angular = window.angular;
	angular.module('mean.auth')
		.factory('authservice', ['$http', function ($http) {
			return {
				login: function (data) {
					// sends a post request to this url with the data
					return $http.post('/auth/login', {
						login: data
					})
				},
				register: function (data) {
					return $http.post('/auth/register', {
						register: data
					})
				}
			}
	}])
}(window));

(function (window) {
	var angular = window.angular;
	angular.module('mean.user')
		.controller('profileCtrl', ['$scope', 'profileservices', '$rootScope', function ($scope, profileservices, $rootScope) {
			var userData = $rootScope.currentUser;
			console.log(userData);
			$scope.post = {
				user: userData._id,
				title: '',
				content: ''
			};

			$scope.submit = function () {
				profileservices.sendPosts($scope.post)
					.then(function (response) {
						console.log(response);
						var success = response.data.posted;
						if (success) {
							$scope.status = success;
							profileservices.getPosts(userData)
								.then(function (response) {
									console.log('inside of profile get posts')
									console.log(response);
									$scope.postslist = response.data;
								}, function (err) {
									console.log(err);
								})
						}
						$scope.post.title = $scope.post.content = '';
					}, function (err) {
						console.log('Error occured');
						console.log(err);
					})

			};

			profileservices.getPosts(userData)
				.then(function (response) {
					console.log('inside of profile get posts')
					console.log(response);
					$scope.postslist = response.data;
				}, function (err) {
					console.log(err);
				})


	}])
}(window));

(function (window) {
  var angular = window.angular;
  var console = window.console;
  angular.module('mean.user')
  .factory('profileservices', ['$http', function ($http) {
    return{
      getPosts: function(userInfo){
        return $http.get('/api/posts/'+ userInfo._id);
      },
      sendPosts: function(data){
        console.log('inside of sending post')
        return $http.post('/api/posts/'+ data._id, {
          posts: data
        })
      }
    }
  }])
}(window))

(function (window) {
	var angular = window.angular;
	angular.module('mean.auth', []);
}(window));

(function(window){
	var angular = window.angular;
	angular.module('mean.user', []);
}(window));
(function (window) {
	"use strict";
	var angular = window.angular,
			session = window.sessionStorage;
			console = window.console;
	angular.module('mean.auth')
		.controller('loginCtrl', ['$scope', '$state', 'authservice', '$rootScope', function ($scope, $state, authservice, $rootScope) {

			$scope.login = {
				email: '',
				password: '',
				signedOn: true
			};

			$scope.error = false;

			$scope.submit = function () {
				console.log($scope.login);
				// sends the data to the auth service
				authservice.login($scope.login)
					.then(function (response) {
						var data = response.data.data;
						if (data) {
							console.log('success');
							console.log(response);
							$rootScope.currentUser = data;
							session.setItem( 'userEmail', data.email );
							$state.go('mean.user',{user: data.name});
						} else {
							$scope.error = true;
							$scope.message = "Email " + $scope.login.email + " Does not exist";
							$scope.login.email = $scope.login.password = "";
						}
					}, function (error) {
						var email = error.config.data.data.email;
						$scope.login.email = $scope.login.password = "";
						$scope.error = true;
						console.log(error);
						$scope.message = "User Email " + email + " " + error.statusText;
					});
			};
        }]);
}(window));

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
