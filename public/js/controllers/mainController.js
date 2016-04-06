Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope){


  $scope.allShots = [];
  $scope.score = 0;

  $scope.calculateScore = function(form) {
    var nextBall = ''
    var thirdBall = ''
    var tempArr = $scope.allShots
    console.log(tempArr);
    for (var i = 0; i < tempArr.length; i++) {
      var frameScore = 0
      $scope.shoulDisplay = false;
      if (tempArr[i].toLowerCase() == 'x') {
        frameScore += 10;
        if (i < 16) {

          if (tempArr[i+1] != '') {
            tempArr[i+1] = ''
            nextBall = tempArr[i+2]
          }


        }







      }

    }
  }
})
