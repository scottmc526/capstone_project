Array.prototype.reverseForEach = function(callback){
  //item, i reference callback
  for(var i = this.length - 1; i >= 0; i--){
    callback(this[i], i);
  }
}


app.controller('mainController', function($scope){


  $scope.allShots = [];
  $scope.score = 0;
  $scope.shouldDisplay = false;

  $scope.calculateScore = function(form) {

    var totalScore = 0;
    var next = ''
    var third = ''
    var tempArr = $scope.allShots
    var display = false;

    for (var i = 0; i <= tempArr.length; i+=2) {
      var frameScore = 0
      if (tempArr[i] == 'x') {
        frameScore += 10;
        //regular frame (not 9th or 10th)
        if (i < 16) {
          //if user put strike in second ball erase it
          if (tempArr[i+1] != '')
            tempArr[i+1] = '';
            next = tempArr[i+2];
        // if nextball is a strike use first ball third frame
          if (next == 'x')
            third = tempArr[i+4]

          else
            third = tempArr[i+3]
            //use second ball of second frame

        }
          // 9th frame
          if (i == 16) {
            next = tempArr[i+2]
            third = tempArr[i+3]
          }
          //10th frame
          if (i == 18) {
            next = tempArr[i+1]
            third = tempArr[i+2]
          }
          if(next != '' && third !='') { //if next two balls have value
            if(next == 'x') { //if next is strike too
              frameScore += 10
              if (third == 'x') {  // third ball also strike
                frameScore += 10
              }
              else {
                frameScore += parseInt(third) // not strike, take value
              }
            }
            //spare
            else {
              if (third == '/') {
                frameScore += 10
              }
              //open frame
              else {
                frameScore += parseInt(next)
                frameScore += parseInt(third)
              }
            }
            display = true
          }
      }
        // not strike so its either spare or open
        else if (tempArr[i] != '' && tempArr[i+1] != ''){
          if (tempArr[i+1] == '/') { // frame is spare
            frameScore += 10
            if(tempArr[i+2] != '') { //check next ball
              if (tempArr[i+2] == 'x'){
                frameScore += 10;
                display = true
              } else {
                frameScore += parseInt(tempArr[i+2])
                display = true;
              }
            }
          }
          else {
            frameScore += parseInt(tempArr[i])
            frameScore += parseInt(tempArr[i+1])
          }
        }
        totalScore += frameScore
        if (frameScore !== NaN) {
          console.log(frameScore);
         $scope.score += frameScore

        }
        // if (display) {
        //   if (frameScore === NaN) {
        //     $scope.shouldDisplay = false;
        //   } else{
        //     $scope.shouldDisplay = true;
        //
        //   }
         //}



        //ng-scope on h3 tags







    }
  }
})
