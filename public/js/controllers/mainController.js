Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope, $cookies){
  //save user name as cookie, use that name in nav bar

  $scope.loggedIn = $cookies.get('user')
  $scope.loggedIn ? $scope.logOut = true : $scope.logOut = false;
  $scope.scoreboard = 0;


  $scope.gameTotal = 0;
  $scope.frameTenTotal = 0;
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




    socket.emit('updateScore', $scope.gameTotal)
    socket.on('updateScore', function(data){
      $scope.scoreboard = data;
      console.log($scope.scoreboard);
    })


  }

  socket.on('init', function (data) {
    console.log(data);
  });





})
