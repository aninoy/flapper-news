'use strict';

angular.module('flapperNewsApp', [
  'flapperNewsApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider
      .otherwise('home');

    $locationProvider.html5Mode(true);
  });

angular.module('flapperNewsApp').factory('posts', [function () {
  var posts = {
    posts: []
    // [{title: 'Post 1', upvotes: 5},
    // {title: 'Post 2', upvotes: 2},
    // {title: 'Post 3', upvotes: 13},
    // {title: 'Post 4', upvotes: 9},
    // {title: 'Post 5', upvotes: 4}]
  };

  return posts;
}]);

angular.module('flapperNewsApp').controller('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
  $scope.posts = posts.posts;

  $scope.addPost = function () {
    if(!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Alice', body: 'Yo yo honey singh!', upvotes: 0}
      ]
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpvotes = function (post) {
    post.upvotes += 1;
  };

}]);

angular.module('flapperNewsApp').controller('PostsCtrl', [
'$scope', '$stateParams', 'posts',
function ($scope, $stateParams, posts) {
  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function () {
    if($scope.bosy === '') {
      return;
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };

}]);

