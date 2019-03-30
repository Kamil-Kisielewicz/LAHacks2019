var request = require('request');
require('dotenv').config({path:'../.env'});

var url = 'http://api.reimaginebanking.com/accounts?key='+process.env.CAPITAL_ONE_API_KEY

// console.log(process.env);

// request.post({
//   headers: {'content-type' : 'application/json'},
//   url:     'http://10.10.34.167:5000/video_summary',
//   body:    {"url": safe}
// }, function(error, response, body){
// 	result = body;
// });

function get_accounts(api_url) {
	request(api_url, function(err, res, body) {  
	    console.log(body);
	});
}

get_accounts(url);