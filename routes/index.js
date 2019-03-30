var express = require('express');
var router = express.Router();

var auth = require('../services/auth');

var config = {
    apiKey: PROCESS.ENV.FIREBASE_API_KEY,
    authDomain: PROCESS.ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: PROCESS.ENV.FIREBASE_DATABASE,
    projectId: PROCESS.ENV.FIREBASE_PROJECT_ID,
    storageBucket: PROCESS.ENV.FIREBASE_STORAGE,
    messagingSenderId: PROCESS.ENV.FIREBASE_SENDING_ID
};
firebase.initializeApp(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
