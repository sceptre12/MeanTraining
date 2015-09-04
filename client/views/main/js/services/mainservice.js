(function(window){
	var angular = window.angular;
	angular.module('mean')
	.factory('mainservice', [function(){
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
				]
			}
		}
	}])
}(window));