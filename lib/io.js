var io = require('socket.io')();

io.on('connection', function(socket){
  socket.on('updateScore', function(data){
    console.log(data);
    io.emit('updateScore', data)
  })

})


module.exports = io;
