var firebase = require('firebase');
require("dotenv").config({path: "../.env"});

var bank = require('./bank');
var maddy_id = "5ca0a6276759394351bee73c";

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
/*
var customer = bank.newCustomer("Maddy", "Wong").catch(function(error) {
  		console.log(error);
	});
console.log(customer._id);
	*/
//console.log("2");
//writeFunction updates the request database and Maddy's portfolio (after performing the transaction of purchasing a stock)
function writeRequest(reqID, userID, accID, cost, ticker, equity, shares) {
	firebase.database().ref('request/' + reqID).set({
	  	userID: userID,
	    accID: accID,
	    cost: cost,
	    ticker: ticker,
	    equity: equity,
	    shares: shares
  	}).catch(function(error) {
  		console.log(error);
	});

    bank.performTransaction(cost, accID);

    firebase.database().ref('users/' + userID+'/portfolio/'+ ticker).set({
    	equity: equity,
    	shares: shares,
        price: cost
    }).catch(function(error) {
  		console.log(error);
	});
}

async function run() {
	let accunt = await bank.accounts()
	console.log(accunt);
}
run();






//console.log("3");
 
//All requests for current stock (e.g. GOOG)
//
//create request so it can be displayed 
//"purchase" stock from Maddy's account with Kamil's function
//change Maddy's portfolio with different objects representing different stocks