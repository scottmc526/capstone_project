var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt')


function User () {
  return knex('users')
}

/* GET home page. */
// router.post('/', function(req, res, next) {
//   var obj = {};
//   obj.name = req.body.namey,
//   obj.email = req.body.email,
//   User().insert(obj).then(function(result){
//     res.json(result)
//   })
// });

router.post('/newuser', function(req, res, next){
  var crypted = bcrypt.hashSync(req.body.password, 8)
  console.log(crypted);
  User().where('email', req.body.email).first().then(function(results){
    if(!results){
      User().insert({email:req.body.email, password: crypted, name: req.body.namey, img_url: req.body.photo}).then(function(result){
        res.cookie('user', req.body.email)
        res.redirect('/#/score')
      })
    } else {
      res.render('/#/')
    }
  })
})



module.exports = router;
