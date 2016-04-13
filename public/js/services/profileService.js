app.service('profileService', function($http) {
  var profileService = {}
  profileService.getScores = function() {
    // return $http.get('http://localhost:3000/scores', {method: "jsonp"});
    return $http.get('http://bowlingscore.herokuapp.com/scores', {method: 'jsonp'})
  }
  return profileService;
})
