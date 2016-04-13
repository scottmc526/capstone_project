app.controller('profileController', function($scope, $cookies, profileService, $http){
  $scope.loggedIn = $cookies.get('user')

  profileService.getScores().then(function(result){
    $scope.score_collection = result.data

  })

})
