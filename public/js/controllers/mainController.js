Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope){
  $scope.gameTotal = 0;
  $scope.gameTotalPTwo = 0;
  $scope.frameTenTotal = 0;
  $scope.frameTenTotalPTwo = 0;
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
  $scope.framesPTwo = [
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
  $scope.frameTenPTwo = [null, null, null]
  $scope.showP2 = false;

  $scope.calculateScore = function() {
    $scope.frameTotal = $scope.frames.map(function(frame, i){
      return frame.reduce(function(prev, curr){

        // 9th frame
        if (i === 8) {
          if (curr == 'x' || curr == 'X') {
            curr = 10 + +$scope.frameTen[0] + +$scope.frameTen[1]
            if ($scope.frameTen[0] == 'x' || $scope.frameTen[0] == 'X') {
              curr = 20
              }
            if ($scope.frameTen[1] == 'x' || $scope.frameTen[1] == 'X') {
              curr = 30
            }
          }
          if (curr == '/') {
            if ($scope.frameTen[0] == 'x' || $scope.frameTen[0] == 'X') {
              curr = 20 - prev
            } else {
              curr = 10 - prev + +$scope.frameTen[0]
            }
          }
        }

        //if first shot is strike
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
          //if second shot is spare
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

    $scope.frameTenTotal = $scope.frameTen.reduce(function(prev, curr){
      if (curr == 'x' || curr == 'X') {
        curr = 10 + +$scope.frameTen[1] - $scope.frameTen[1]
        if ($scope.frameTen[1] == 'x' || $scope.frameTen[1] == 'X') {
          curr = 10
        }
      }
      else if (curr == '/') {
        curr = 10 + +$scope.frameTen[2]
        if ($scope.frameTen[2] == 'x' || $scope.frameTen[2] == 'X') {
          curr = 10
        } else {
          curr = 10 - prev
        }
      }
      return +prev + +curr
    }, 0)


    $scope.gameTotal = $scope.frameTenTotal + $scope.frameTotal.reduce(function(prev, curr){
      return prev + curr
    })
  }





  $scope.calculateScorePTwo = function() {
    $scope.frameTotalP2 = $scope.framesPTwo.map(function(frame, i){
      return frame.reduce(function(prev, curr){

        // 9th frame
        if (i === 8) {
          if (curr == 'x' || curr == 'X') {
            curr = 10 + +$scope.frameTenPTwo[0] + +$scope.frameTenPTwo[1]
            if ($scope.frameTenPTwo[0] == 'x' || $scope.frameTenPTwo[0] == 'X') {
              curr = 20
              }
            if ($scope.frameTenPTwo[1] == 'x' || $scope.frameTenPTwo[1] == 'X') {
              curr = 30
            }
          }
          if (curr == '/') {
            if ($scope.frameTenPTwo[0] == 'x' || $scope.frameTenPTwo[0] == 'X') {
              curr = 20 - prev
            } else {
              curr = 10 - prev + +$scope.frameTenPTwo[0]
            }
          }
        }

        //if first shot is strike
        if (curr == 'x' || curr == 'X') {
          if ($scope.framesPTwo[i][1] !== '') {
            $scope.framesPTwo[i][1] = ''
          }
          if ($scope.framesPTwo[i+1][0] == 'x' || $scope.framesPTwo[i+1][0] == 'X' ) {
            if($scope.framesPTwo[i+2][0] == 'x' || $scope.framesPTwo[i+2][0] == 'X') {
              curr = 30
            } else {
              curr = 20 + +$scope.framesPTwo[i+2][0]
            }
          } else if ($scope.framesPTwo[i+1][1] == '/'){
            curr = 20
          }
           else {
            curr = 10 + +$scope.framesPTwo[i+1][0] + +$scope.framesPTwo[i+1][1]
          }
          //if second shot is spare
        } else if (curr == '/') {
          if ($scope.framesPTwo[i+1][0] == 'x' || $scope.framesPTwo[i+1][0] == 'X') {
            curr = 20 - prev
          } else {
            curr = 10 - prev + +$scope.framesPTwo[i+1][0]

          }
        }
        return +prev + +curr
      }, 0)
    })

    $scope.frameTenTotalPTwo = $scope.frameTenPTwo.reduce(function(prev, curr){
      if (curr == 'x' || curr == 'X') {
        curr = 10 + +$scope.frameTenPTwo[1] - $scope.frameTenPTwo[1]
        if ($scope.frameTenPTwo[1] == 'x' || $scope.frameTenPTwo[1] == 'X') {
          curr = 10
        }
      }
      else if (curr == '/') {
        curr = 10 + +$scope.frameTenPTwo[2]
        if ($scope.frameTenPTwo[2] == 'x' || $scope.frameTenPtwo[2] == 'X') {
          curr = 10
        } else {
          curr = 10 - prev
        }
      }
      return +prev + +curr
    }, 0)


    $scope.gameTotalPTwo = $scope.frameTenTotalPTwo + $scope.frameTotalP2.reduce(function(prev, curr){
      return prev + curr
    })
  }









})
