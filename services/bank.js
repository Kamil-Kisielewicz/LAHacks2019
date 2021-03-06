var request = require('request');
var rp = require('request-promise');
require('dotenv').config({
    path: '../.env'
});

var fin_type = '';
var base_bank_url = 'http://api.reimaginebanking.com/'
var bank_key = '?key=' + process.env.CAPITAL_ONE_API_KEY
var merchant_id = "5ca061b46759394351bee725";


async function get_customer_by_id(customer_id) {
    var customer;
    fin_type = 'customers/' + customer_id;
    var get_customer_by_id_url = base_bank_url + fin_type + bank_key; //could potentially move these as globals 

    var options = {
        uri: get_customer_by_id_url,
        json: true
    };

    let value = await rp(options);
    return value;
}

async function get_customers() {
    fin_type = 'customers/';
    var get_customer_by_id_url = base_bank_url + fin_type + bank_key; //could potentially move these as globals 

    var options = {
        uri: get_customer_by_id_url,
        json: true
    };

    let value = await rp(options);
    return value;
}

//creates a customer
//done
async function create_new_customer(first_name, last_name) {
    var new_customer;
    fin_type = 'customers';
    var create_new_customer_url = base_bank_url + fin_type + bank_key;

    var options = {
    	method: 'POST',
    	uri: create_new_customer_url,
    	body: {
            "first_name": first_name,
            "last_name": last_name,
            "address": {
                "street_number": "22228",
                "street_name": "Hammond Way",
                "city": "Cupertino",
                "state": "CA",
                "zip": "95014"
            }
        },
        json: true
    }

    let value = await rp(options);
    return value;
}


async function create_new_customer_account(_id, account_nickname, init_balance, account_number) {
    fin_type = "customers/" + _id + "/accounts";
    var create_new_customer_account_url = base_bank_url + fin_type + bank_key;

    var options = {
    	method: 'POST',
    	uri: create_new_customer_account_url,
    	body: {
            "type": "Credit Card",
            "nickname": account_nickname,
            "rewards": 0,
            "balance": init_balance,
            "account_number": account_number
        },
        json: true
    }

    let value = await rp(options);
    return value;
}


function delete_customer_account(_id) {
    fin_type = "accounts/" + _id;
    var delete_customer_account_url = base_bank_url + fin_type + bank_key;
    request.delete({
        url: delete_customer_account_url,
        json: {
            "id": _id
        }
    }, function(error, response, body) {
        console.log(body);
    });
}

async function perform_transaction(transaction_value, account_id) {
    var new_transaction;
    fin_type = 'accounts/' + account_id + '/purchases';
    var perform_transaction_url = base_bank_url + fin_type + bank_key;

    var options = {
        method: 'POST',
        uri: perform_transaction_url,
        body: {
            "merchant_id": merchant_id,
            "medium": "balance",
            "amount": transaction_value
        },
        json: true // Automatically stringifies the body to JSON
    };

    let value = await rp(options);
    return value;
}

async function get_account_by_id(_id) {
    fin_type = 'accounts/' + _id;
    var get_account_by_id_url = base_bank_url + fin_type + bank_key;

    var options = {
        uri: get_account_by_id_url,
        json: true
    };

    let value = await rp(options);
    return value;
}

function get_customer_balance_by_id(account) {
    return account.balance;
}

async function get_accounts() {
    fin_type = 'accounts';
    var get_accounts_url = base_bank_url + fin_type + bank_key;

    var options = {
        uri: get_accounts_url,
        json: true
    }

    let result = await rp(options);
    return result;
}
//Note: must have correct parameters
module.exports.getCustomer = get_customer_by_id;

module.exports.newCustomer = create_new_customer;

module.exports.makeAccount = create_new_customer_account;

module.exports.deleteAcc = delete_customer_account;

module.exports.performTransaction = perform_transaction;

module.exports.accountID = get_account_by_id;

module.exports.balance = get_customer_balance_by_id;

module.exports.accounts = get_accounts;

async function run() {
    // let account = await get_account_by_id("5c9ef3c6322fa06b6779497b");
    // var balance = get_customer_balance_by_id(account);
    // let accounts = await get_accounts();
    // let created_customer = await create_new_customer("kamil","kisielewicz");
    // let created_account = await create_new_customer_account("5ca0a6276759394351bee73c", "Checkings", 100000, "1234569283940145");
    // let transaction = await perform_transaction(100, "5c9ef3c6322fa06b6779497b");
    // let maddy_success = await create_new_customer("Maddy", "Wong")
    // let customer_success = await get_customers();

    // console.log(created_account);
}
// run();