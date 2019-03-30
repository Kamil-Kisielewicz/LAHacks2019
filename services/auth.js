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

var login_provider = new firebase.auth.GoogleAuthProvider();
//provider.addScope('https://www.googleapis.com/auth/userinfo.email');
//Sign-in with a popup for Google login
firebase.auth().signInWithPopup(login_provider).then(function(result)
{
	var token = result.credential.accessToken;
	var user = result.user;
}).catch(function(error)
{
	var errorCode = error.code;
	var errorMessage = error.message;
//TODO: implement error redirect when account exists with different credentials
	var email = error.email;
	var credential = error.credential;
});
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