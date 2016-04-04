var app = angular.module('bowlingApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'partials/scores.html',
    controller: 'mainController'
  })



})
