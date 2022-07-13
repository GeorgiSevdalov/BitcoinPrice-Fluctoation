"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import { weekData, monthData } from "../dataJSON/data.json";
const getObj_1 = require("./getObj");
const fs = __importStar(require("fs"));
function bitFluct(bitPrice, objJSON) {
    console.log(`Bitcoin price in this moment: ${bitPrice}`);
    const _seven = 7; //declarate it like const because need 7 days period.
    let priceWeekStorage = objJSON.weekData.arrayW;
    let sumWeek = 0; //sum values form priceStorage.
    let sumMonth = 0; //sum values form monthAverageStorage
    let highestWeekPrice = 0;
    let lowestWeekPrice = 0;
    let highestMonthPrice = 0;
    let lowestMonthPrice = 0;
    let checkLow = Number.MAX_SAFE_INTEGER;
    if (priceWeekStorage.length < _seven) {
        priceWeekStorage.push(bitPrice);
    }
    else if (priceWeekStorage.length === _seven) {
        priceWeekStorage.shift();
        priceWeekStorage.push(bitPrice);
    }
    for (let el of priceWeekStorage) {
        sumWeek += el;
        if (el > highestWeekPrice) {
            highestWeekPrice = el;
        }
        if (el < checkLow) {
            checkLow = el;
            lowestWeekPrice = el;
        }
    }
    let averageValueW = sumWeek / priceWeekStorage.length; //average value for week.
    console.log(`Bitcoin average price for week: ${averageValueW}
    Highest price for period: ${highestWeekPrice}
    Lowest price for period: ${lowestWeekPrice}`);
    let monthAverageStorage = objJSON.monthData.arrayM; // used for calculating months
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
    console.log(`Bitcoin average price for 1 month (28days): ${averageValueM}
    Highest price for period: ${highestMonthPrice}
    Lowest price for period: ${lowestMonthPrice}`);
    // update arrayW = priceWeekStorage;
    //update arrayM = monthAverageStorage;
    let updatedJson = JSON.stringify({
        weekData: {
            arrayW: priceWeekStorage
        },
        monthData: {
            arrayM: monthAverageStorage
        }
    });
    fs.writeFile("/dataJSON/data.json", updatedJson, "utf-8", () => { });
}
//invokes bitFluct with argument (bitcoin price from API)
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinPrice = yield (0, getData_1.getCoinPrice)();
        let objJSON = yield (0, getObj_1.getObjFromJson)();
        bitFluct(coinPrice, objJSON);
    }
    catch (err) {
        console.log(err);
    }
}))();
