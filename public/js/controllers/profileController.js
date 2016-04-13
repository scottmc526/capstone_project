app.controller('profileController', function($scope, $cookies, profileService, $http){
  $scope.loggedIn = $cookies.get('user')

  $scope.average = 0;
  $scope.totalScore = 0;
  profileService.getScores().then(function(result){
    $scope.score_collection = result.data
    for (var i = 0; i < $scope.score_collection.length; i++) {
      $scope.totalScore += Number($scope.score_collection[i]['gameTotal'])
    }
    $scope.average = Math.round($scope.totalScore / $scope.score_collection.length)
  })

})
