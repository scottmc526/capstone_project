var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');




function User () {
  return knex('users')
}

function Score() {
  return knex('scores')
}

router.get('/logout', function(req, res, next){
  res.clearCookie('user')
  res.redirect('/#/');
});

router.post('/login', function(req,res,next){
  User().where({name:req.body.namey}).first().then(function(found){
    if (found) {
      if (bcrypt.compareSync(req.body.password, found.password)){
        res.cookie('user', req.body.namey)
        res.redirect('/#/learn_the_system')
      } else {
        // res.send('invalid username or password')
        res.redirect('/#/')
      }
    } else {
      // res.send('invalid')
      res.redirect('/#/')
    }
  })
})

router.post('/newuser', function(req, res, next){
  var crypted = bcrypt.hashSync(req.body.password, 8)
  User().where('email', req.body.email).first().then(function(results){
    if(!results){
      User().insert({email:req.body.email, password: crypted, name: req.body.namey, img_url: req.body.photo}).then(function(result){
        res.cookie('user', req.body.namey)
        res.redirect('/#/score')
      })
    } else {
      res.redirect('/#/')
    }
  })
})

router.post('/scores', function(req,res,next){
  Score().insert({'bowler_name': req.cookies, gameTotal: req.body.gameTotal}).then(function(result){
    res.redirect('/#/profile')
  })
})

router.get('/scores', function(req,res,next){
  Score().select().where('bowler_name', req.cookies).then(function(result){
    res.json(result)
  })
})


module.exports = router;
