var firebase = require('firebase');
require("dotenv").config({path: "../.env"});

var bank = require('./bank');
var maddy_id = "5ca0a6276759394351bee73c";
var maddy_acc_id = "5ca0a9186759394351bee741";
var maddy_firebase_id = "7oo5LfrKKzf454RgaGosRdQYGte2";

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
async function writeRequest(cost, ticker, equity, shares) {
	let request_success = await firebase.database().ref('request/').push({
	  	userID: maddy_id,
	    accID: maddy_acc_id,
	    cost: cost,
	    ticker: ticker,
	    equity: equity,
	    shares: shares
  	});
  	console.log(request_success);

    let transaction_status = await bank.performTransaction(cost, maddy_acc_id);
    console.log(transaction_status);

    let portfolio_success = await firebase.database().ref('users/' + maddy_firebase_id +'/portfolio/'+ ticker).set({
    	equity: equity,
    	shares: shares,
        price: cost
    });
    console.log(portfolio_success);
}

async function run() {
	let result = await writeRequest(100, "GOOG", 0.51, 1);
	console.log(result);
}
run();






//console.log("3");
 
//All requests for current stock (e.g. GOOG)
//
//create request so it can be displayed 
//"purchase" stock from Maddy's account with Kamil's function
//change Maddy's portfolio with different objects representing different stocks