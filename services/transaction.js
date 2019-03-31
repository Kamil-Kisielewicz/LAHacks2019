
var firebase = require('firebase');
require("dotenv").config({path: "../.env"});

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

function writeRequest(reqID, userID, accID, amount, ticker, equity, shares) {
  firebase.database().ref('request/' + reqID).set({
  	userID: userID,
    accID: accID,
    amount: amount,
    ticker: ticker,
    equity: equity,
    shares: shares
  });
}
 
//All requests for current stock (e.g. GOOG)
//