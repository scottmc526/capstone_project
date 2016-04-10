var io = require('socket.io')();

io.on('connection', function(socket){
  socket.on('my event', function(data){
    console.log(data);
  })
  socket.on('hello', function(data) {
    console.log(data);
  })
})

module.exports = io;
