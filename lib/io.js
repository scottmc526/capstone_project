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

var scoresArr = [];
var num = 0;

function User (){
  return knex('users')
}


io.on('connection', function(socket){
  var name = userNames.getGuestName()
  scoresArr.push({
    id : num,
    score : 0,
    name : name
  })
  socket.emit('init', scoresArr, num)
  num++
  socket.on('updateScore', function(updateObj){
    scoresArr.forEach(function(scoreObj){
      if (scoreObj.id === updateObj.bowlerId) {
        scoreObj.score = updateObj.score
      }
    })
    io.emit('updateScore', scoresArr)
  })

  // name: name,
  // users: userNames.get()
})


module.exports = io;
