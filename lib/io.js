var io = require('socket.io')();
// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Bowler ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());







io.on('connection', function(socket){
  var name = userNames.getGuestName();
  console.log(name);
  socket.on('updateScore', function(data){
    // console.log(data);
    io.emit('updateScore', data)
  })
  io.emit('init', {
    name: name,
    users: userNames.get()
  });


  io.on('disconnect', function () {
    io.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
})


module.exports = io;
