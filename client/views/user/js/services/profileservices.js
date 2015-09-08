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
