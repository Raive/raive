var express = require('express');
var router = express.Router();
var passport = require('passport');

var List = require('../models/list');

/* GET home page. */
router.get('/', function(req, res, next) {
  List.find({}).
   then(function (lists) {
     console.log(lists);
     res.render('index', {title: 'Raive', lists: lists});
   }, function (err) {
     return next(err);
   });
});

// Sign Up / Sign In Routes
router.get('/signup', function (req, res, next) {
  res.render('users/signup', {message: req.flash(), action: 'signup' });
});

router.get('/signin', function (req, res, next) {
  res.render('users/signin', {message: req.flash(), action: 'signin' });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
    successFlash: true
}));

router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
    successFlash: true
}));

router.get('/signout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/getStarted', function (req, res, next) {
  res.render('lists/start');
});

module.exports = router;
