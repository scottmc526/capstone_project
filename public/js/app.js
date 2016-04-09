var app = angular.module('bowlingApp', ['ngRoute', 'ngResource']);

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



})
