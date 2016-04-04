var app = angular.module('bowlingApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'partials/index.html',
    controller: 'mainController'
  })



})
