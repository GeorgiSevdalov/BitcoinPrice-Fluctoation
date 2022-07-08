const fetch = require('node-fetch');

 const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14100987acmsh61d0d81580d426bp1bdc39jsn61ae73a0184c',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
	.then(response => response.json())
	.then(response => console.log(response.data.price))
	.catch(err => console.error(err));