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
