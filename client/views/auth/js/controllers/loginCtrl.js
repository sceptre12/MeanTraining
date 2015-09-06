(function(window){
	var angular = window.angular;
	angular.module('mean.auth')
	.controller('loginCtrl', ['$scope','$state', 'authservice','$rootScope', function($scope,$state,authservice,$rootScope){
		$scope.login = {
			email: '',
			password:''
		};
		$scope.error = false;
		
		$scope.submit = function(){
			console.log($scope.login)
			// sends the data to the auth service
			authservice.login($scope.login)
			.then(function(response){
				var data = response.data.data;
				if(data){					
					console.log('success')
					console.log(response);
					$state.go('mean.user');
				}else{
					$scope.error = true;
					$scope.message = "User " + $scope.login.email + " Does not exist" ;
					$scope.login.email = $scope.login.password = "";
				}
			}, function(error){				
				var email = error.config.data.data.email;
				$scope.login.email = $scope.login.password = "";
				$scope.error = true;
				console.log(error);
				$scope.message = "User Email " + email + " "  + error.statusText;				
			})
		}
	}])
}(window));