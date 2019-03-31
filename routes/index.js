var express = require('express');
var router = express.Router();
var firebase = require('firebase');
require("dotenv").config();

//var maddy_firebase_id = "7oo5LfrKKzf454RgaGosRdQYGte2";

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDING_ID
};
firebase.initializeApp(config);

var database = firebase.database();
// var auth = require('../services/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log();
  get_requests("GOOG").then(function(data) {
      console.log(data);
  })
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
})

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

router.get('/requests', function(req, res, next)
{
	res.render('requests', {title: 'Search', show: results});
})
var data = [];
function get_requests(ticker) {
	return firebase.database().ref('/requests').once("value").then(function(snapshot) {
		//console.log(Object.values(snapshot.val()));
		var data = [];
		var keys = Object.keys(snapshot.val());
		console.log(keys);
		var vals = Object.values(snapshot.val());
		for(var i = 0; i < vals.length; i++)
		{
			if(vals[i].ticker == ticker) {
				data.push(snapshot.val()[keys[i]]);
			}
		}
		return data;
	})
}

// var results = [];
// router.post('/requests', function(req, res, next){
// 	var requestSearch = firebase.database().ref('requests/');
// 	console.log(requestSearch);
	
// })

module.exports = router;
//cycle through requests and check if ticker value is equal 
//using this and EJS, make an EJS that displays firebase Portfolio object & function that pulls all requests from certain ticker