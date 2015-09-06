(function(window){
	var angular = window.angular;
	angular.module('mean.auth')
	.controller('registerCtrl', ['$scope', '$state' ,'authservice', function($scope,$state,authservice){
		$scope.register = {
			name: '',
			email: '',
			password: ''
		};
		$scope.submit = function(){
			console.log($scope.register);
			authservice.register($scope.register)
			.then(function(response){
				var success = response.data.data;
				if(success === 'success'){
					$state.go('mean.user');
				}else{
					console.log(error);
				}
			}, function(error){
				console.log(error);
			})
		};
	}])
}(window));