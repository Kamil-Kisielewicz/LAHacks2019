var rp = require('request-promise');

async function get_stock(ticker) {
	base_url = "https://www.blackrock.com/tools/hackathon/performance?identifiers=" + ticker;

	var options = {
		uri: base_url,
		json: true
	}

	let result = await rp(options);
	return result;
}

function set_table(data){
	map = data.resultMap.RETURNS[0].returnsMap;

	var formatted_stock_data = [[], []];
	for (var item in map){
		formatted_stock_data[0].push(parseInt(map[item].asOfDate));
		formatted_stock_data[1].push(parseFloat(map[item].level));
	}
	return formatted_stock_data;
}

module.exports.get_stock = get_stock;
module.exports.set_table = set_table;