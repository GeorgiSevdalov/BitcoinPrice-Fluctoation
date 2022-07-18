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
const getData_1 = require("./getData"); //log price at the moment
const getObj_1 = require("./getObj");
const WeekMonData = (0, getObj_1.getWeekMonData)();
function averageWeek() {
    let priceWeekStorage = WeekMonData.weekData.arrayW;
    let sum = 0;
    let averageW = 0;
    for (let el of priceWeekStorage) {
        sum += el;
    }
    averageW = sum / priceWeekStorage.length;
    return averageW;
}
function averageMonth() {
    let priceMonthStorage = WeekMonData.monthData.arrayM;
    let sum = 0;
    let averageM = 0;
    for (let el of priceMonthStorage) {
        sum += el;
    }
    averageM = sum / priceMonthStorage.length;
    return averageM;
}
function output(momentPrice) {
    let priceWeekStorage = WeekMonData.weekData.arrayW;
    let priceMonthStorage = WeekMonData.monthData.arrayM;
    console.log(`Bitcoin price in this moment: ${momentPrice}`);
    console.log(`Average value for week is: ${averageWeek()}
    Highest price for period: ${Math.max(...priceWeekStorage)}
    Lowest price for period: ${Math.min(...priceWeekStorage)}`);
    console.log(`Average value for month is: ${averageMonth()}
    Highest price for period: ${Math.max(...priceMonthStorage)}
    Lowest price for period: ${Math.min(...priceMonthStorage)}`);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinPrice = yield (0, getData_1.getCoinPrice)();
        output(coinPrice);
    }
    catch (err) {
        console.log(err);
    }
}))();
