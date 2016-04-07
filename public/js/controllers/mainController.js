Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope){
  $scope.gameTotal = 0;
  $scope.frames = [
    [null, null],
    [null, null],
    [null, null],
    [null, null],
    [null, null],
    [null, null],
    [null, null],
    [null, null],
    [null, null],
  ]

  $scope.frameTen = [null, null, null]

  $scope.calculateScore = function() {
    $scope.frameTotal = $scope.frames.map(function(frame, i){
      return frame.reduce(function(prev, curr){
        if (curr == 'x' || curr == 'X') {
          if ($scope.frames[i][1] !== '') {
            $scope.frames[i][1] = ''
          }
          if ($scope.frames[i+1][0] == 'x' || $scope.frames[i+1][0] == 'X' ) {
            if($scope.frames[i+2][0] == 'x' || $scope.frames[i+2][0] == 'X') {
              curr = 30
            } else {
              curr = 20 + +$scope.frames[i+2][0]
            }
          } else if ($scope.frames[i+1][1] == '/'){
            curr = 20
          }
           else {
            curr = 10 + +$scope.frames[i+1][0] + +$scope.frames[i+1][1]
          }
        } else if (curr == '/') {
          if ($scope.frames[i+1][0] == 'x' || $scope.frames[i+1][0] == 'X') {
            curr = 20 - prev
          } else {
            curr = 10 - prev + +$scope.frames[i+1][0]

          }
        }
        return +prev + +curr
      }, 0)
    })

    $scope.gameTotal = $scope.frameTotal.reduce(function(prev, curr){
      return prev + curr
    })




  }

  // $scope.calculateScore = function(form) {
  //
  //   var tempArr = $scope.allFrames;
  //   $scope.frameOneTotal = false;
  //   $scope.score = 0;
  //
  //   tempArr.reverseForEach(function(frameArr, i){
  //     console.log(i);
  //     var total = 0;
  //     frameArr.forEach(function(item, i){
  //       if(item === "x"){
  //         frameArr[i+1] = ''
  //         total += 10;
  //       } else if (item === '/'){
  //         total += (10 - frameArr[i-1])
  //       } else {
  //         total += +item;
  //         $scope.frameOneTotal = true;
  //       }
  //     })
  //     $scope.score += total;
  //   })
  //
  //
  //
  //
  //
  //
  // }


})
