Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope){
  $scope.frameOne = [null, null];
  $scope.frameTwo = [null, null];
  $scope.frameThree = [null, null];
  $scope.allFrames = [];
  $scope.allFrames.push($scope.frameOne, $scope.frameTwo, $scope.frameThree)



  $scope.calculateScore = function(form) {

    var tempArr = $scope.allFrames;
    $scope.frameOneTotal = false;
    $scope.score = 0;

    tempArr.reverseForEach(function(frameArr, i){
      var total = 0;
      frameArr.forEach(function(item, i){
        if(item === "x"){
          total += 10;
        } else if (item === '/'){
          total += (10 - frameArr[i-1])
        } else {
          total += +item;
          $scope.frameOneTotal =true;
        }
      })
      $scope.score += total;
    })

    console.log($scope.score);





  }


})
