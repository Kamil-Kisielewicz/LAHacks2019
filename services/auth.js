var firebase = require('firebase')
var firebaseui = require('firebaseui')
var config = {
    apiKey: PROCESS.ENV.FIREBASE_API_KEY,
    authDomain: PROCESS.ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: PROCESS.ENV.FIREBASE_DATABASE,
    projectId: PROCESS.ENV.FIREBASE_PROJECT_ID,
    storageBucket: PROCESS.ENV.FIREBASE_STORAGE,
    messagingSenderId: PROCESS.ENV.FIREBASE_SENDING_ID
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