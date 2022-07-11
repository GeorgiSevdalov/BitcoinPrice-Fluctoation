"use strict";
exports.__esModule = true;
exports.getCoinPrice = void 0;
var node_fetch_1 = require("node-fetch");
var printIt = function (priceAsString) {
    var value = Number(priceAsString);
    return value;
};
function getCoinPrice() {
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '14100987acmsh61d0d81580d426bp1bdc39jsn61ae73a0184c',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        /*first fetch the data and then create a
        function to do something with this data
        Then pass the result to that function and access it anywhere!*/
        var value;
        (0, node_fetch_1["default"])('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
            .then(function (response) { return response.json(); })
            .then(function (response) {
            resolve(printIt(response.data.price));
        })["catch"](function (err) { return reject(err); });
    });
}
exports.getCoinPrice = getCoinPrice;
