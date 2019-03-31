var firebase = require('firebase');

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDING_ID
};
firebase.initializeApp(config);

/*
if(BUTTON_PRESSED)
{
	firebase.auth().signOut().then(function() 
	{
  // Sign-out successful.
	}).catch(function(error) 
	{
  // An error happened.
	});
}
*/
module.exports.config = config;