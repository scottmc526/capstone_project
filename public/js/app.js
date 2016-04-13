var app = angular.module('bowlingApp', ['ngRoute', 'ngResource', 'ngCookies']);



app.config(function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'mainController'
  })
  .when('/score', {
    templateUrl: 'partials/scores.html',
    controller: 'mainController'
  })
  .when('/signup', {
    templateUrl: 'partials/signUp.html',
    controller: 'signUpController'
  })
  .when('/learn_the_system', {
    templateUrl: 'partials/learn_the_system.html'
  })
  .when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'profileController'
  })



})
