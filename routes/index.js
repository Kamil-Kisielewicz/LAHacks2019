var express = require('express');
var router = express.Router();
var firebase = require('firebase');
require("dotenv").config();

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDING_ID
};
firebase.initializeApp(config);

// var auth = require('../services/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vault' });
});

router.get('/signup', function(req, res, next)
{
	res.render('signup', { name: 'Vault', title: 'Sign-Up'});
})

router.post('/signup', function(req, res, next)
{
	email = req.body.email;
	password = req.body.password;
	console.log(req.body);
	//console.log(process.env);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
	{
	  console.log(error);
	});

	res.redirect("/");

})

router.get('/login', function(req, res, next) 
{
  res.render('login', { name: 'Vault', title: 'Login'});
});

router.post('/login', function(req, res, next)
{
	console.log(req.body);
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
  		console.log(error);
	});
	res.redirect("/");
});

router.get('/dashboard', function(req, res, next)
{
	res.render('signout');
})
router.post('/signout', function(req, res, next)
{
	firebase.auth().signOut().then(function() {
	  console.log('Signed Out');
	}, function(error) {
	  console.error('Sign Out Error', error);
	});
	res.redirect('/');
})

module.exports = router;
