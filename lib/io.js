var io = require('socket.io')();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  var nextUserId;
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
    var name
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
    var id = 0;
    for (user in names) {
      id++
      var tmp = {}
      tmp.name = user;
      tmp.id = id;
      tmp.score = 0;
      res.push(tmp);
    }

    return res;
  };

  // var free = function (name) {
  //   if (names[name]) {
  //     delete names[name];
  //   }
  // };

  return {
    claim: claim,
    // free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

var scoresObj = {};

function User (){
  return knex('users')

}


io.on('connection', function(socket){

  socket.on('joinGame', function(game){

    socket.room = game.room;
    socket.join(socket.room)

    if(!(game.room in scoresObj)){
      scoresObj[game.room] = [];
    }
    scoresObj[game.room].push({
      name: game.userName,
      score : 0
    })
    socket.emit('joinedRoom')
    io.sockets.in(socket.room).emit('updateScore', scoresObj[socket.room]);

  })

  socket.on('updateScore', function(updateObj){
    scoresObj[socket.room].forEach(function(scoreObj){
      if (scoreObj.name === updateObj.name) {
        scoreObj.score = updateObj.score
      }
    })
    io.sockets.in(socket.room).emit('updateScore', scoresObj[socket.room])
  })

  socket.on('leaveGame', function(name){
    var indexToRemove = -1;
    scoresObj[socket.room].forEach(function(scoreObj, i){
      if(scoreObj.name === name){
        indexToRemove = i;
      }
    })
    if (indexToRemove > -1){
      scoresObj[socket.room].splice(indexToRemove, 1);
    }

    if(scoresObj[socket.room].length < 1){
      delete scoresObj[socket.room] ;
    }

    if(socket.room in scoresObj){
      io.sockets.in(socket.room).emit('updateScore', scoresObj[socket.room]);
    }

    socket.leave(socket.room);

})

})


module.exports = io;
