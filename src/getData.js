"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinPrice = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
//pass the result form API and parse it to number.
let printIt = (priceAsString) => {
    const value = Number(priceAsString);
    return value;
};
// warp fetch in export function
function getCoinPrice() {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '14100987acmsh61d0d81580d426bp1bdc39jsn61ae73a0184c',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        /*fetch the data; create a function to do something with this data
         and access it anywhere!*/
        (0, node_fetch_1.default)('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
            .then((response) => response.json())
            .then((response) => {
            resolve(printIt(response.data.price));
        })
            .catch((err) => reject(err));
    });
}
exports.getCoinPrice = getCoinPrice;
