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
    var score = 0;

    tempArr.reverseForEach(function(frameArr, i){
      var total = 0;
      frameArr.forEach(function(item, i){
        if(item === "x" || item === "/"){
          total += 10;
        }else{
          total += +item;
        }
      })
      score += total;
    })

    console.log(score);

    // for (var i = tempArr.length - 1; i >= 0; i--) {
    //   if(tempArr)
    // }



  }


})


// $scope.frameOneTotal = ''
// var firstball = ''
// var nextball = ''
// var thirdball = ''
//1st Frame
// if ($scope.ballTwo.toLowerCase() == 'x') {
//   $scope.frameOneTotal = "you cant have a strike there"
// } else if ($scope.ballOne.toLowerCase() == '/'){
//   $scope.frameOneTotal = 'you cant have a spare there'
// } else if ($scope.ballOne.toLowerCase == 'x') {
//   firstball = 10;
//   nextball = $scope.ballThree;
//   if ($scope.ballThree.toLowerCase == 'x') {
//     thirdball = Number($scope.ballFive)
//   } else {
//     thirdball = Number($scope.ballFour)
//   }
// } else {
//   firstball = Number($scope.ballOne)
// }
// console.log('first:', firstball, 'second:', nextball, 'third:', thirdball);
