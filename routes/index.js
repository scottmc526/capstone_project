var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');




function User () {
  return knex('users')
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
        res.redirect('/#/score')
      } else {
        res.send('invalid username or password')
        res.redirect('/#/')
      }
    } else {
      res.send('invalid')
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



module.exports = router;
