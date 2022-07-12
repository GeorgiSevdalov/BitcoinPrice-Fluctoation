"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./getData");
function bitFluct(bitPrice) {
    console.log(`Bitcoin price in this moment: ${bitPrice}`);
    const _seven = 7; //declarate it like const because need 7 days period.
    let priceStorage = [19850.175784254872, 18970.175784254872, 19760.175784254872, 20150.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872];
    let sumWeek = 0; //sum values form priceStorage.
    let sumMonth = 0; //sum values form monthAverageStorage
    let highestWeekPrice = 0;
    let lowestWeekPrice = 0;
    let highestMonthPrice = 0;
    let lowestMonthPrice = 0;
    let checkLow = Number.MAX_SAFE_INTEGER;
    if (priceStorage.length < _seven) {
        priceStorage.push(bitPrice);
    }
    else if (priceStorage.length === _seven) {
        priceStorage.shift();
        priceStorage.push(bitPrice);
    }
    for (let el of priceStorage) {
        sumWeek += el;
        if (el > highestWeekPrice) {
            highestWeekPrice = el;
        }
        if (el < checkLow) {
            checkLow = el;
            lowestWeekPrice = el;
        }
    }
    let averageValueW = sumWeek / priceStorage.length; //average value for week.
    console.log(`Bitcoin average price for week: ${averageValueW}
    Highest price for period: ${highestWeekPrice}
    Lowest price for period: ${lowestWeekPrice}`);
    let monthAverageStorage = [19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 19550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 22550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 19550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 17750.172784254872, 19750.1735784254872, 19760.175784254872, 19950.175784254872, 19750.172784254872]; // used for calculating months
    if (monthAverageStorage.length < 28) {
        monthAverageStorage.push(averageValueW);
    }
    else {
        monthAverageStorage.shift();
        monthAverageStorage.push(averageValueW);
    }
    for (let el of monthAverageStorage) {
        sumMonth += el;
        if (el > highestMonthPrice) {
            highestMonthPrice = el;
        }
        if (el < checkLow) {
            checkLow = el;
            lowestMonthPrice = el;
        }
    }
    let averageValueM = sumMonth / monthAverageStorage.length; //average value for month
    console.log(`Bitcoin average price for 1 month (28days) ${averageValueM}
    Highest price for period: ${highestMonthPrice}
    Lowest price for period: ${lowestMonthPrice}`);
}
//invokes bitFluct with argument (bitcoin price from API)
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinPrice = yield (0, getData_1.getCoinPrice)();
        bitFluct(coinPrice);
    }
    catch (err) {
        console.log(err);
    }
}))();
