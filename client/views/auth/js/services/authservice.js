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
