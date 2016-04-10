app.factory('info', function($http){
  return {
    create: function(obj){
      return $http.post('/', obj)
  }
}




})
