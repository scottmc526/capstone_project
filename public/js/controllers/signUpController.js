app.controller('signUpController', function($scope, info){
  $scope.signUp = {}
  $scope.signUp = function() {
    info.create($scope.signUp).then(function(){
      console.log("posted user");
    })
  }


})
